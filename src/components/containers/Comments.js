import React, { Component } from 'react';
import Comment from '../presentation/Comment';
import styles from './styles';
import superagent from 'superagent';

class Comments extends Component {
    constructor(){
        super();
        this.state = {
          comment: {
                username:'',
                body:'',
                timestamp:''
          },
          list:[

          ]
        };
    }
    componentDidMount(){
        console.log('componentDidMount:');
        superagent
            .get('/api/comment')
            .query(null)
            .set('Accept','application/json')
            .end((err, response)=> {
                if(err){
                    alert('ERROR'+err);
                    return
                }
                console.log(JSON.stringify(response.body));
                let results = response.body.results;
                this.setState({
                    list: results
                });
            });
    }
    submitComment(){
        //console.log('submitComment'+ JSON.stringify(this.state.comment));
        let updatedList = Object.assign([], this.state.list);
        updatedList.push(this.state.comment);
        this.setState({
            list:updatedList
        });
    }
    updateUsername(event){
        //console.log('updateUsername:'+ event.target.value);
        let updatedComment = Object.assign({}, this.state.comment);
        updatedComment['username'] = event.target.value;
        this.setState({
            comment: updatedComment
        });
    }
    updateBody(event){
        //console.log('updateBody:'+ event.target.value);
        let updatedComment = Object.assign({}, this.state.comment);
        updatedComment['body'] = event.target.value;
        this.setState({
            comment: updatedComment
        });
    }
    updateTimestamp(event){
        //console.log('updateTimestamp:'+ event.target.value);
        let updatedComment = Object.assign({}, this.state.comment);
        updatedComment['timestamp'] = event.target.value;
        this.setState({
            comment: updatedComment
        });
    }
    render(){
        const commentList = this.state.list.map((comment, i)=>{
            return(
                <li key={i}><Comment currentComment={comment}/></li>
            );
        });
        return(
            <div>
                <h2>Zone 1</h2>
                <div style={styles.comment.commentsBox}>
                    <ul style={styles.comment.commentsList}>
                        {commentList}
                    </ul>
                    <p><input onChange={this.updateUsername.bind(this)} type="text" className="form-control" placeholder="username" /></p>
                    <p><input onChange={this.updateBody.bind(this)} type="text" className="form-control" placeholder="comment" /></p>
                    <p><input onChange={this.updateTimestamp.bind(this)} type="text" className="form-control" placeholder="timestamp" /></p>
                    <button className="btn btn-info" onClick={this.submitComment.bind(this)}>Submit Comment</button>
                </div>

            </div>
        );
    }
}

export default Comments;