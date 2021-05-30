#twitter-search-and-filter-tool

Jason Roberts

Coding Challenge
Twitter Search & Filter Tool


Steps to start the App:
1. Install node_modules at the root of the server folder: npm install
2. Start the server: node app.js
3. Install node_modules at the root of the client folder: npm install
4. Start the client: npm run start
5. Navigate to http://localhost:3000


Acceptance Criteria
1. App should display a title, search, list of tweets, and hashtag container (see mocks)
2. User should be able to search for tweets by keyword
    a. Search should be debounced
    b. Search should only return (5) tweets
3. Tweets should match the mocks, and include the following:
    a. Avatar of the author
    b. Username of the author
    c. Tweet content
    d. Clickable URL of the tweet
    e. Clickable hashtag
4. User should be able to click a “Load More” button to load additional tweets
    a. Load More should append to the list of tweets
    b. Load More should only add (5) additional tweets
    c. If unique hashtags are found, Load More should append those to the hashtag list
5. User should be able to filter tweets by clicking on a hashtag
    a. Filter should be able to be set and unset
    b. When set, the list of tweets should only include those with a matching hashtag
    c. When unset, the list of tweets should be reset to its state before filtering


    
