export class Translation {
    static Translater(
        lang: string = 'EN',
        file: string,
        variable: string,
        parameters: {} = {}
    ) {
        // console.log('request params',{lang,file,variable,parameters});
        
        var jsonData;
        switch (lang.toLowerCase()) {
            case 'en':
                jsonData = require(`../../../shared/i18n/en/${file}.json`);
                break;
            case 'fr':
                jsonData = require(`../../../shared/i18n/fr/${file}.json`);
                break;
            default:
                jsonData = require(`../../../shared/i18n/en/${file}.json`);
                break;
        }
        lang=='pt' && console.log('json data',jsonData);
        
        var msgData = jsonData[`${variable}`];

        if(!msgData)
        {
            jsonData = require(`../../../shared/i18n/en/${file}.json`);
            msgData = jsonData[`${variable}`];
            
            if(!msgData){
                msgData = variable
            }
        }

        // console.log('msg data',msgData);
        
        function renderString(msg: string, object) {
            return msg.match(/\{(.*?)\}/gi).reduce((acc, binding) => {
                const property = binding.substring(1, binding.length - 1);
                var str = acc == '' || acc == null ? msg : acc;
                return `${str.replace(/\{(.*?)\}/, object[property])}`;
            }, '');
        }
        if (msgData.match(/\{(.*?)\}/gi)) {

            // console.log('---if---',msgData)
            return renderString(msgData, parameters);
        } else {

            // console.log('---els---',msgData)
            return msgData;
        }
    }

}