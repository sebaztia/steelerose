<?php
//Begin Really Simple SSL Load balancing fix
if ((isset($_ENV["HTTPS"]) && ("on" == $_ENV["HTTPS"]))
|| (isset($_SERVER["HTTP_X_FORWARDED_SSL"]) && (strpos($_SERVER["HTTP_X_FORWARDED_SSL"], "1") !== false))
|| (isset($_SERVER["HTTP_X_FORWARDED_SSL"]) && (strpos($_SERVER["HTTP_X_FORWARDED_SSL"], "on") !== false))
|| (isset($_SERVER["HTTP_CF_VISITOR"]) && (strpos($_SERVER["HTTP_CF_VISITOR"], "https") !== false))
|| (isset($_SERVER["HTTP_CLOUDFRONT_FORWARDED_PROTO"]) && (strpos($_SERVER["HTTP_CLOUDFRONT_FORWARDED_PROTO"], "https") !== false))
|| (isset($_SERVER["HTTP_X_FORWARDED_PROTO"]) && (strpos($_SERVER["HTTP_X_FORWARDED_PROTO"], "https") !== false))
|| (isset($_SERVER["HTTP_X_PROTO"]) && (strpos($_SERVER["HTTP_X_PROTO"], "SSL") !== false))
) {
$_SERVER["HTTPS"] = "on";
}
//END Really Simple SSL

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', '' );

/** MySQL database username */
define( 'DB_USER', '' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'J57.ZZ[X3><R0-M[K#-CL[p8[mb&_a5ea|Cf+0xGa|4+4M81ZHUe5O9w0g9t=C+(');
define('SECURE_AUTH_KEY',  'A^+0[]@=0]-n%`~vw%&<YmN`8DvJ4MbP-J.sy1]E|g~Gn8Zg.g5i:v+if{O+|k)6');
define('LOGGED_IN_KEY',    '0q8)~AEmMfJ-FNF64;$39bv+D)-(k9b;6Wam9yin*3ZDrNv-EK5+]D6h#1De.:hh');
define('NONCE_KEY',        '2%RjB`!?,>l}#e@qWz}S9}$Lfj>:T|^a4_15W:|y*|?EsaF{t`s?1.jWb6nmdvto');
define('AUTH_SALT',        'u+>;WRk>@&(DT;%Q[ph8U*|f>AfN@c]eoq1%_YV*x0YwW*2oF{%%-UNpLK|uh!)a');
define('SECURE_AUTH_SALT', 'l{2%y0!:FEi(_YV;Tu`TTMZIlL!W]B^%Zsp$|$ZGdl1Q/)zE)/8E7biF~Y<QXalr');
define('LOGGED_IN_SALT',   'x:X9^U.JB><]C$&lGQ9o8#=YgiQ67Y5;af~x8kh!%ROxJXPdR}u| ,-Hl=4^>WrP');
define('NONCE_SALT',       '~I)bIVw2f;`,5|gO/,ioEP0jy]`SzxXpy^0e|gffGe>:@]<pSQK[Dh/ykq^|rPkU');


/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );
# define('WP_MEMORY_LIMIT', '256M');

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
