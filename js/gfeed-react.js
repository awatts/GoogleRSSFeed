'use strict';

var RSSFeed = React.createClass({
    getInitialState: function() {
        return {
            feed: {
                title: '',
                feedURL: '',
                link: '',
                entries: []
            }
        };
    },
    componentDidMount: function() {
        $.ajax({
            url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(this.props.url),
            dataType: 'json',
            success: function(data) {
                this.setState({feed: data.responseData.feed});
            }.bind(this),
            error: function(xhr, status, errorstring) {
                console.error(this.props.url, status, err.toString());
                // possible status values: "timeout", "error", "abort", and "parsererror"
            }.bind(this)
        });
    },
    render: function() {
        return(
            <div class="large-12 columns">
                    <div class="row">
                        <div class="large-9 columns">
                            <h1 class="page-heading"><a href={this.state.feed.link}>{this.state.feed.title}</a></h1>
                        </div>
                        <div class="large-3 columns">
                            <a href={this.state.feed.feedUrl} class="rss">RSS&nbsp;<i class="fa fa-rss"></i></a>
                        </div>
                    </div>
                    <div class="row">
                        <FeedList data={this.state.feed.entries} />
                    </div>
                </div>
        );
  }
});

var FeedList = React.createClass({
    render: function() {
        var feedPosts = this.props.data.map(function(post) {
            return (
                <FeedItem data={post} />
            );
        });
        return(
            <ul class="wp-entry">
            {feedPosts}
            </ul>
        );
    }
});


var FeedItem = React.createClass({
    render: function() {
        return(
            <li>
                <span class="post-meta">{this.props.data.publishedDate} by {this.props.data.author}</span>
                <h3><a class="post-link" href={this.props.data.link}>{this.props.data.title}</a></h3>
                <div class="post-content" dangerouslySetInnerHTML={createMarkup(this.props.data.content)} />
            </li>
        );
    }
});

function createMarkup(content) { return {__html: content}; };
        

ReactDOM.render(
  <RSSFeed url='https://hlplab.wordpress.com/feed/atom/' />,
  document.getElementById('wpfeed')
);
