const headers = new Headers(
    {
        'content-type': 'application/json',
        'X-WP-Nonce' : Globals.rest_nonce
    });

const endpoints = {
    template : Globals.api_url + "twig/get-template/",
    intent : Globals.api_url + "stripe/payment/setup-intent/"
};

export default class Payment {

    form = {};
    intent = false;

    getForm = async(product, amount) => {

        await this.setupIntent(amount);

        let fetchData = {
            method: 'post',
            mode: 'cors',
            body : JSON.stringify({
                "path" : "take-payment",
                "filename" : "take-payment.twig",
                "data" : {
                    amount : (amount / 100),
                    product
                }
            }),
            headers
        };

        const req =
            await fetch(endpoints.template, fetchData);

        return await req.json();
    };

    bindForm = async(card, elements) => {
        const { form } = this;
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
                    await stripe.confirmCardPayment(this.intent.client_secret, {
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
        this.form = form;

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

    setupIntent = async(amount) => {
        let fetchData = {
            method: 'post',
            mode: 'cors',
            body : JSON.stringify({
                amount
            }),
            headers
        };

        const req =
            await fetch(endpoints.intent, fetchData);

        this.intent = await req.json();

        console.log(this.intent);
    };


    loading(is) {
        const { form } = this;
      if(is) {
          form.find('.dpl-take-payment').addClass('hide');
          form.find('.spinner').removeClass('hide');
      }  else {
          form.find('.dpl-take-payment').removeClass('hide');
          form.find('.spinner').addClass('hide');
      }
    }
}