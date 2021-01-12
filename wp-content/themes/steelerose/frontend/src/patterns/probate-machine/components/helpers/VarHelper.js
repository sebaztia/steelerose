export default (text) => {

    if(text && (typeof text === 'string' || text instanceof String)) {
        const parts =
            text.match("{{(.*?)}}");

        if (parts) {
            const replace =
                document.getElementById(parts[1]);

            if(replace) {
                const re = new RegExp(parts[0], 'g');
                const isAddress = /,,/.test(replace.value);
                if(isAddress) {
                    replace.value = replace.value.split(',')[0];
                }
                return text.replace(re, replace.value);
            }
        }

        return text;
    }

    return text;
}