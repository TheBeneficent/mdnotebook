import showdown from "showdown";
const DIR=`/storage/emulated/0/Android/data/mdnotebook.thebeneficent.com.github/files`;
const md2html=str=>{
    const converter = new showdown.Converter();
    return converter.makeHtml(String(str));
}
const standardScreenName=str=>'sc'+String(str).replace(/[^a-zA-Z0-9]/g, "");
const newName=(pre='')=>{
    const d = new Date();
    return String(pre)+d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString() + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString() + d.getMilliseconds().toString();
}
export {DIR, md2html, standardScreenName, newName};
