# Webflow <> React.js
A document on options for connecting Webflow with React for this project
* Goal: to connect what we have so far to a link in the navbar on Webflow *

## Resources: 
  - Adding React components to Webflow: https://webflow.com/blog/react-components-in-webflow 
  - Webflow and React example: https://webflow.com/website/Webflow-React
  - Integrating Webflow into React: https://supertokens.io/blog/speed-up-your-web-development-time-by-integrating-webflow-into-a-react-application 

## Options: 
  1. Create the navbar in React and connect the component to Webflow, linking the prescriptions page
  2. Make the Landing page in React and integrate Webflow for the body of it (See last resource link)
  3. Have the React app on a seperate domain and then link the domain to the navbar in Webflow
  4. Rebuild the landing page in React, use ReactRouter for multiple pages, have everything in one place.

## Breakdown on how to connect: 
  - Since Webflow doesn’t allow you to host your own script files on their servers, we’ll have to load the script from an external server. The tutorial uses S3 from Amazon.
  - Modern browsers enforce Cross-Origin Resource Sharing (CORS) rules which don’t allow your site to load content from an external URL. To get around this limitation, we need to tell S3 to send a CORS header specifying that any origin can GET the files in our bucket.