Social Prescribing

Social prescribing is when health care professionals refer patients to community services and resources to help improve their physical and or mental wellbeing. This social prescription project is a website where a user can search for resources in their area by zip code, and sort those results by category. Site users can also save their favorite results to refer back to them at a later time.

Development Process

This product was developed using multiple tools. Once scoped, event based websites were selected based on their API functions and the needs of the product to be the sites data results are pulled from. The front end of the site was created using React, and Firebase was used to help connect the front end to the database entries. AWS was then set up so that the Postgres database could be made. During this time the code was updated to reflect the major changes to Firebase’s documentation. Routes were then updated to improve functionality, and the ability to save favorite results was added. 

# Project Set-up



**Note:** Install yarn if you don't already have it

```bash
sudo npm install -g yarn  
```

## Install dependencies 

```bash 
yarn initialize
```

## Run project while developing

```bash 
yarn dev
```