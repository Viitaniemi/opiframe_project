import React from 'react';

export default class Article extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            article: this.fetchArticle(this.parseURL())
        }
    }

    fetchArticle = (articleName) => {
        //temp article
        let tempArticleJSON = [
            {"articleTitle": articleName},
            {"contents": [
                {"title": "title1"},
                {"content": "content1"},
                {"title": "title2"},
                {"content": "content2"}
            ]},
            {"editedBy": "asd qwerty"},
            {"lastEdited": new Date().toString()}
        ]
        return tempArticleJSON;
    }

    //gets the desired article name from page URL
    parseURL = () => {
        let URL = window.location.pathname;
        let pos = URL.lastIndexOf("/") + 1;
        return URL.slice(pos);
    }

    render(){
        console.log(this.state.article);
        let article = this.state.article.map((item, index = 0) => {
            index++;
            let key = Object.keys(item);
            //Main article title
            if (key[0] === "articleTitle")
                return (<h1 className="articleTitle" key={index}>{item.articleTitle}</h1>)

            //process article body
            if (key[0] === "contents"){
                //map through article body components
                return item.contents.map((subItem, subindex = 100) => {
                    subindex++;
                    let subkeys = Object.keys(subItem);
                    if (subkeys[0] === "title")
                        return (<h2 className="articleSubTitle" key={subindex}>{subItem.title}</h2>)
                    if (subkeys[0] === "content")
                        return (<p className="articleContent" key={subindex}>{subItem.content}</p>)
                })
            }

            //create information for editedBy
            if (key[0] === "editedBy")
                return (<p className="edited" key={index}>last edited by: {item.editedBy}, </p>)
            if (key[0] === "lastEdited")
                return (<p className="edited" key={index}>{item.lastEdited}</p>)
            console.log(article);
        })

        return(
            <div className="article">
                {article}
            </div>
        )
    }
}