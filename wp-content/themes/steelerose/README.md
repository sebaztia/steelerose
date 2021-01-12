# Starter Theme
A basic WordPress theme with some useful functions and automation tools to get started

### Features
- Opinionated theme development pattern
- Manage Gutenberg Blocks with ACF Pro
- Useful WP_CLI commands for automation
- Useful Rest API Endpoints
- Simple Timber templating (https://timber.github.io/docs/)
- A bunch of useful Functions and Classes

### Getting Started
Set `[WP-CLI] command_prefix` in `theme-settings.ini` in the themes directory. This sets the prefix for the custom WP-CLI commands that can be run inside the project. 

Install WP-CLI if not already - https://wp-cli.org

Once installed run the following
````
wp [command_prefix] install_theme
````
This will install all the necessary dependencies. 

### WP-CLI Commands
##### Install Dependencies
````
wp [command_prefix] theme_install
````

##### Create Block Category
````
wp [command_prefix] block_create_cat
````

##### Remove Block Category
````
wp [command_prefix] block_remove_cat
````

##### Create Block
````
wp [command_prefix] block_create
````

##### Remove Block
````
wp [command_prefix] block_remove
````

### Functions
##### `theme_get_blocks_dir()`
Returns the Blocks directory

Default `/theme/blocks/`

##### `theme_get_blocks_url()`
Returns the Blocks URL

Default `domain.com/wp-content/themes/[name]/theme/blocks`

##### `theme_create_block($name, $args = array())`
Creates a new Block from scaffold

##### `theme_create_block_cat($title, $slug)`
Creates a new Block Category from scaffold

##### `theme_remove_block($name)`
Removes the Block

##### `theme_remove_block_cat($name)`
Removes the Block Category

##### `theme_get_fields_dir()`
Returns the ACF Fields directory

Default `theme/fields`

##### `theme_get_message($section, $type, $message)`
Returns a specific message from `theme-messages.ini`

### Globals
Getting a setting from theme-settings.ini
````
$GLOBALS['theme_settings'][\setting\];
````
Getting a setting from theme-messages.ini
````
$GLOBALS['theme_settings'][\message\];
````

### Classes
##### `Theme\Login`
````
$login = new Theme\Login(
    $credentials = array(
        'user_login' => 
            'email_or_username',
        'user_password' => 
            '#####'
    ), 
    $secure_cookie = false
)

$login->do();

if($login->errors) {
 // error
}
````

### API (v1)

#### Login

##### `/wp-json/theme/v1/login`
##### Methods : POST
````
{
	"credentials" : {
		"user_login" : "email_or_username",
		"user_password" :"#####"
	}
}
````
###### Error response
````
{
    "errors" : [] // List of errors    
}
````
###### Success response
````
{
    ...user object
    "success": true 
}
````

##### `/wp-json/theme/v1/set-password`
##### Methods : POST, PUT
````
// Request Key (POST)
{
    "type" : "reset",
	"username" : "email_or_username"
}

// Set password (PUT)
{
    "type" : "set",
    "username" : "username",
    "key" : "#####", // key sent to email
    "password" : "#####", // password and
    "cpassword" : "#####" // cpassword must match
}
````
###### Error response
````
{
    "errors" : [] // List of errors    
}
````
###### Success response
````
{
    ...data
    "success": true 
}
````

##### `/wp-json/theme/v1/account/create`
##### `/wp-json/theme/v1/account/update`
##### Methods : PUT (create) POST (update)
````
{
    "user_login" : "#####",
    "user_email" : "#####",
    "first_name" : "Joe",
    "custom_field" : "Custom Data"
}
````

###### Error response
````
{
    "errors" : [] // List of errors    
}
````
###### Success response
````
{
    ...data
    "success": true 
}
````

### Timber
##### Render a template
````
Timber::render(
    'widgets/recent_posts.twig',
    array(
        ...context
    )
);
// Outputs widget contents
````

##### Compile a template
````
$template = Timber::compile(
    'email/reset-password.twig',
    array(
        ...context
    )
);

wp_mail(
    'email@email.com', 
    'Subject',
    $template
);
// Send compiled template as e-mail
````

### Theme Guide

### TODO
- `_wp-cli/block_create` / `_functions\block_create` : enable preact / non preact
- `_wp-cli` : check for available software before proceeding (i.e. requires wp-cli, webpack, npm etc...)
- `Theme\API` : write CLI to create new API endpoint and write to `theme/api` (CRUD or Single)
- Write theme guide
- Windows?