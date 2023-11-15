import React from 'react';

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;

    // Function to truncate text to a specified word limit
    const truncateText = (text, limit) => {
        const alphanumericRegex = /[a-zA-Z]/g; // Regex to match alphabets
        const alphanumericChars = text.match(alphanumericRegex); // Match all alphabetic characters
        const charCount = alphanumericChars ? alphanumericChars.length : 0; // Count of alphabetic characters

        if (charCount > limit) {
            text = text.match(new RegExp(`(?:[^\x00-\x7F]|.{0,${limit}}[a-zA-Z])`))[0];
            // Truncate text to the specified limit considering UTF-8 characters
        }

        return text;
    };

    // Count alphabets separately for title and description and truncate them
    const truncatedTitle = truncateText(title, 86);
    const truncatedDescription = truncateText(description, 97);


    const defaultImageUrl = "https://www.pexels.com/photo/turned-on-smartphone-1024864/"; // Default image URL
    return (
        <div className="my-3">
            <div className="card relative">
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: '0',
                    marginRight: '10px'
                }}>
                    <span className="badge rounded-pill bg-danger"> {source} </span>
                </div>
                <img
                    src={imageUrl || defaultImageUrl} // Use imageUrl if available, otherwise use defaultImageUrl
                    className="card-img-top"
                    alt="..."
                    style={{ width: '415px', height: '234px' }} // Set the image size
                />

                <div className="card-body">
                    <h5 className="card-title">{truncatedTitle}</h5>
                    <p className="card-text">{truncatedDescription}</p>
                    <p className="card-text">
                        <small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small>
                    </p>
                    <a rel="" href={newsUrl} target="_blank" className="btn btn-sm btn-dark ">Read More</a>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
