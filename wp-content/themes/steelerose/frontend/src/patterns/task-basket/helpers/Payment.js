import {
    h,
    Component,
    render
} from 'preact';
var React = require('react');
var HtmlToReact = require('html-to-react');
var HtmlToReactParser = require('html-to-react').Parser;
import Loader from "../helpers/Loader.js";

const headers = new Headers(
    {
        'content-type': 'application/json',
        'X-WP-Nonce' : Globals.rest_nonce
    });

const endpoints = {
    template : Globals.api_url + "twig/get-template/",
    sources : Globals.api_url + "stripe/payment/methods",
    intent : Globals.api_url + "stripe/payment/setup-intent/",
    method : Globals.api_url + "stripe/payment/attach-method"
};

export default class Payment extends Component {

    state = {
        useSavedMethod : false,
        paymentMethod: {},
        content : <Loader />,
        intent : false,
        form : {}
    };

    componentDidMount = async() => {
        await this.getTemplate();
        await this.applyStripe({
            contentEl: document
                .getElementsByClassName(
                    "cc-form"
                )[0]
        })
    };

    useForm = async() => {
        this.setState({
            content : <Loader />,
            useSavedMethod : false,
            paymentMethod : {}
        }, async() => {
            await this.getTemplate();
        });
    };

    useSavedMethod = async(id, brand, last4) => {
        this.setState({
            content : <Loader />,
            useSavedMethod : true,
            paymentMethod : {
                id,
                brand,
                last4
            }
        }, async() => {
            await this.getTemplate();
        });
    };

    confirmSavedMethod = async() => {
        const { intent, paymentMethod, form } = this.state;

        this.setState({
            content : <Loader />
        });

        const paymentResponse  =
            await stripe.confirmCardPayment(intent.client_secret, {
                payment_method: paymentMethod.id
            });

        if(paymentResponse.error) {
            form.find('.take-payment__errors')
                .addClass('validation_error')
                .html(paymentResponse.error.message);
        } else {
            document.dispatchEvent(
                new CustomEvent('payment-accepted')
            );
        }
    };

    getTemplate = async(type = 'default') => {
        const { tasks } = this.props;
        const { useSavedMethod, paymentMethod } = this.state;
        const htmlToReactParser = new HtmlToReactParser();

        let total = 0;
        tasks.forEach(v => {
            total =
                (parseInt(total) + parseInt(v.price));
        });

        if(!useSavedMethod) {

            await this.setupIntent(total);

            const methods =
                await this.getMethods();

            const getOverview = {
                method: 'post',
                mode: 'cors',
                body: JSON.stringify({
                    "path": "payment-overview",
                    "filename": "payment-overview.twig",
                    "data": {
                        total: (total / 100).toFixed(2),
                        products: tasks
                    }
                }),
                headers
            };

            const getMethods = {
                method: 'post',
                mode: 'cors',
                body: JSON.stringify({
                    "path": "payment-methods",
                    "filename": "payment-methods.twig",
                    "data": {methods}
                }),
                headers
            };

            const getForm = {
                method: 'post',
                mode: 'cors',
                body: JSON.stringify({
                    "path": "payment-form",
                    "filename": "payment-form.twig"
                }),
                headers
            };

            const overviewTemplate =
                await fetch(endpoints.template, getOverview);
            const overviewHTML =
                await overviewTemplate.json();

            const methodsTemplate =
                await fetch(endpoints.template, getMethods);
            const methodsHTML =
                await methodsTemplate.json();

            const formTemplate =
                await fetch(endpoints.template, getForm);
            const formHTML =
                await formTemplate.json();

            var processNodeDefinitions =
                new HtmlToReact
                    .ProcessNodeDefinitions(React);

            var processingInstructions = [
                {
                    shouldProcessNode: (node) => {
                        return node.parent &&
                            node.parent.name &&
                            node.parent.name === 'a' &&
                            node.parent.attribs.class === "payment-methods__card-saved";
                    },
                    processNode: (node, children) => {
                        node.parent.attribs.onClick = () => {
                            this.useSavedMethod(
                                node.parent.attribs['data-id'],
                                node.parent.attribs['data-brand'],
                                node.parent.attribs['data-last4']
                            );
                        };
                        return node.data;
                    }
                },
                {
                    shouldProcessNode: (node) => {
                        return true;
                    },
                    processNode: processNodeDefinitions.processDefaultNode
                }
            ];

            var isValidNode = () => {
                return true;
            };

            const overviewReact = htmlToReactParser.parse(overviewHTML);
            const methodsReact = htmlToReactParser.parseWithInstructions(
                methodsHTML,
                isValidNode,
                processingInstructions
            );
            const formReact = htmlToReactParser.parse(formHTML);


            this.setState({
                content: [overviewReact, methodsReact, formReact]
            })
        } else {
            await this.setupIntent(total, paymentMethod.id);

            const getOverview = {
                method: 'post',
                mode: 'cors',
                body: JSON.stringify({
                    "path": "payment-overview",
                    "filename": "payment-overview.twig",
                    "data": {
                        total: (total / 100).toFixed(2),
                        products: tasks
                    }
                }),
                headers
            };
            const overviewTemplate =
                await fetch(endpoints.template, getOverview);
            const overviewHTML =
                await overviewTemplate.json();

            const getConfirmPaymentMethod = {
                method: 'post',
                mode: 'cors',
                body: JSON.stringify({
                    "path": "payment-methods",
                    "filename": "payment-methods-confirm.twig",
                    "data": {
                        paymentMethod
                    }
                }),
                headers
            };

            processNodeDefinitions =
                new HtmlToReact
                    .ProcessNodeDefinitions(React);

            processingInstructions = [
                {
                    shouldProcessNode: (node) => {
                        return node.parent &&
                            node.parent.name &&
                            node.parent.name === 'button' &&
                            node.parent.attribs.id === "confirm-payment-method";
                    },
                    processNode: (node, children) => {
                        node.parent.attribs.onClick = () => {
                            this.confirmSavedMethod();
                        };
                        return node.data;
                    }
                },
                {
                    shouldProcessNode: (node) => {
                        return true;
                    },
                    processNode: processNodeDefinitions.processDefaultNode
                }
            ];

            isValidNode = () => {
                return true;
            };

            const confirmPaymentMethodTemplate =
                await fetch(endpoints.template, getConfirmPaymentMethod);
            const overviewReact = htmlToReactParser.parse(overviewHTML);
            const confirmPaymentMethodHTML =
                await confirmPaymentMethodTemplate.json();
            const confirmPaymentMethodReact = htmlToReactParser.parseWithInstructions(
                confirmPaymentMethodHTML,
                isValidNode,
                processingInstructions
            );

            this.setState({
                content : [overviewReact, confirmPaymentMethodReact]
            })
        }
    };

    getMethods = async() => {
        let fetchData = {
            method: 'get',
            mode: 'cors',
            headers
        };

        const req =
            await fetch(endpoints.sources, fetchData);

        return await req.json();
    };

    bindForm = async(card, elements) => {
        const { form, intent } = this.state;
        form.find('button[type=submit]').on('click', async() => {

            this.loading(true);

            let
                name =
                    form.find('input#card-name').val(),
                payment_method = {error:{}};

            name = (name ? name : false);

            if(!name) {
                payment_method.error.message = "Add the name on card.";
            } else {
                payment_method  =
                    await stripe.confirmCardPayment(intent.client_secret, {
                        payment_method: {
                            card: card.cardNumber,
                            billing_details: {
                                name,
                                email : Globals.user_logged_in_email
                            }
                        }
                    });
            }

            this.loading(false);

            if(payment_method.error) {
                form.find('.take-payment__errors')
                    .addClass('validation_error')
                    .html(payment_method.error.message);
            } else {
                document.dispatchEvent(
                    new CustomEvent('payment-accepted')
                );
            }
        });
    };

    applyStripe = async(form) => {

        form = $(form.contentEl);
        this.setState({form});

        const assets = JSON.parse(await $.ajax({
            type : "get",
            url : Globals.ajax_url,
            data : {
                action : 'stripe_preload_assets'
            }
        }));

        if(typeof Stripe === 'undefined') {
            await $.getScript(assets.url);
            window.stripe = Stripe(assets.key);
        }

        let elements = stripe.elements({
            locale: 'auto'
        });
        let card = {};

        let elementClasses = {
                focus: 'focused',
                empty: 'empty',
                invalid: 'invalid',
            },
            elementStyles = {
                base: {}
            };

        card.cardNumber = elements.create('cardNumber', {
            classes: elementClasses,
            style: elementStyles
        });
        card.cardNumber.mount(form.find('#card-number')[0]);

        card.cardExpiry = elements.create('cardExpiry', {
            classes: elementClasses,
            style: elementStyles
        });
        card.cardExpiry.mount(form.find('#card-expiry')[0]);

        card.cardCvc = elements.create('cardCvc', {
            classes: elementClasses,
            style: elementStyles
        });
        card.cardCvc.mount(form.find('#card-cvc')[0]);

        this.card = card;
        this.elements = elements;

        this.bindForm(this.card, this.elements);

        this.loading(false);
    };

    setupIntent = async(amount, payment_method = false) => {
        let fetchData = {
            method: 'post',
            mode: 'cors',
            body : JSON.stringify({
                amount,
                payment_method
            }),
            headers
        };

        const req =
            await fetch(endpoints.intent, fetchData);

        const intent = await req.json();
        this.setState({intent});
    };


    loading(is) {
        const { form } = this.state;

      if(is) {
          form.find('.dpl-take-payment').addClass('hide');
          form.find('.spinner').removeClass('hide');
      }  else {
          form.find('.dpl-take-payment').removeClass('hide');
          form.find('.spinner').addClass('hide');
      }
    }

    render() {
        const { content } = this.state;

        return <div className="cc-form">{content}</div>;
    }
}