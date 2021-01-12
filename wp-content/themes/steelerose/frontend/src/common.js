// Big hit area on navigation boxes
import $ from "jquery";

document.Account = new class {
    api_url = Globals.api_url;
    api_headers = {
        'Content-Type': 'application/json'
    };

    login = async(
        user_login,
        user_password
    ) => {

        const endpoint =
            this.api_url + 'login/';

        const res = await fetch(endpoint, {
            method : "POST",
            headers: this.api_headers,
            body : JSON.stringify({ credentials : {
                    user_login,
                    user_password
                }
            })
        });

        return await res.json();
    };

    create = async(
        user_email,
        user_login,
        first_name
    ) => {

        const endpoint =
            this.api_url + 'account/create';

        const res = await fetch(endpoint, {
            method: 'PUT',
            headers: this.api_headers,
            body : JSON.stringify({
                user_email,
                user_login,
                first_name
            })
        });
        return await res.json();
    };

    reset_password = async(
        user_email
    ) => {

        const endpoint =
            this.api_url + 'set-password/';

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: this.api_headers,
            body : JSON.stringify({
                type : 'reset',
                username : user_email
            })
        });
        return await res.json();
    };

    set_password = async(
        username,
        key,
        password,
        cpassword
    ) => {
        const endpoint =
            this.api_url + 'set-password/';

        const res = await fetch(endpoint, {
            method: 'PUT',
            headers: this.api_headers,
            body : JSON.stringify({
                type : "set",
                username,
                key,
                password,
                cpassword
            })
        });
        return await res.json();
    }
};