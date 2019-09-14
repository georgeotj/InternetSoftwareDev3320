# Internet Software Development Group Project

## Project Structure: 
*place_holder.txt was only added so the directory would push to github,
after you pull the file layout structure you can delete them*
    
        .
        ├── docs 
        │   ├── page_images 
        │   │   └──  // .png files of our project's pages for turning in 
        │   │ ...
        │   └── // Documentation files
        │
        ├── node_modules
        │   │   // If we use NodeJS for the server side instead of XAMPP,          
        │   │   // This folder will contain all the NodeJS dependencies required.  
        │   │   // When you type 'npm install' into the terminal on WebStorm, the  
        │   │   // node dependencies get installed inside here. Don't commit it to 
        │   └── // The repo because they're generally heavy in terms of space.     
        │   
        ├── www
        │   ├── Assets
        │   │   │
        │   │   ├── Audio
        │   │   │   └ // app audio ( .mp4 files )
        │   │   ├── Fonts     
        │   │   │   └ // app fonts ( .ttf/ .woff files )
        │   │   └── Images
        │   │       └ // app images ( reduced .jpg/ .png files )
        │   │   
        │   ├── Data  
        │   │   └ // app information (.JSON Files) 
        │   │
        │   ├── JavaScript ( Might separate this directory into more sub directories ) 
        │   │   │ 
        │   │   └ // Scripts ( .js files )
        │   │   
        │   ├── Libs  ( A lot of examples show JS files in here )
        │   │   │
        │   │   └ // 3rd party Libraries and general purpose files
        │   │
        │   ├── StyleSheets ( .css/ .scss files )
        │   │   │   
        │   │   ├── Globals  
        │   │   │   │    (all.css, colors.css, functions.css, fonts.css, grid.css, variables.css, etc...
        │   │   │   ...
        │   │   │   └ // general styles used across the whole web project      
        │   │   │        
        │   │   ├── Modules
        │   │   │   ├── // .css files for layout
        │   │   │   │
        │   │   │   ├── // .css files for presentation
        │   │   │   │
        │   │   │   └── ( Might make .css files by web page instead )
        │   │   │
        │   │   └── // main.css        ( primary .css file, -might name "styles.css" )
        │   │     
        │   └── Views       ( .html files )
        │       │
        │       ├── Pages       
        │       │   ├── checkout.html               ( checkout page )
        │       │   ├── shippinginfo.html           ( shipping information page )
        │       │   ├── userinfo.html               ( user information page )
        │       │   ├── shoppingcart.html           ( shopping cart page )
        │       │   ├── ...
        │       │   └── // Layout of website pages
        │       │   
        │       └── Templates 
        │           │
        │           └ // possible template layouts we find and use 
        │
        ├── src
        │   │
        │   └── // might need directory for back-end files? ( add way later )
        │
        ├── .gitignore
        │
        ├── _config.yml  ( Jekyll use )
        │
        ├── index.html   ( website entry point )               
        │
        ├── LICENSE 
        │
        ├── robots.txt ( talks to search engine crawlers )
        │
        └── README.md
         
## Current Page Images (9-13-2019)        