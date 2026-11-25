<?php
/**
 * ProjectDuniya Store promotion for blogs.projectduniya.com (WordPress).
 *
 * Install: Appearance > Theme File Editor > functions.php (use a child theme),
 * or paste into a "Code Snippets" plugin. Paste everything below this comment.
 *
 * What it does:
 *  1. Adds a Store promo box after every single blog post (category-aware).
 *  2. Adds a one-line Store nudge after the 3rd paragraph of every post.
 *  3. Adds a [pd_store_promo] shortcode for the home page or any page.
 *  4. Adds a "Store" link to your primary menu.
 */

function pd_store_url( $path = '/projects', $campaign = 'blog' ) {
	return esc_url( 'https://store.projectduniya.com' . $path . '?utm_source=blogs.projectduniya.com&utm_medium=blog&utm_campaign=' . $campaign );
}

// Blog category slug => store category slug. Anything unmapped goes to all projects.
function pd_store_category_path( $post_id ) {
	$map = array(
		'ai-machine-learning'         => 'ai-machine-learning',
		'data-analysis-visualization' => 'data-analytics',
		'microsoft-excel'             => 'data-analytics',
		'programming'                 => 'python-projects',
		'programming-help-debugging'  => 'python-projects',
		'website-design-development'  => 'web-development',
		'coding-development'          => 'web-development',
	);
	foreach ( (array) get_the_category( $post_id ) as $cat ) {
		if ( isset( $map[ $cat->slug ] ) ) {
			return '/category/' . $map[ $cat->slug ];
		}
	}
	return '/projects';
}

function pd_store_box( $path = '/projects', $campaign = 'blog_post_box' ) {
	$href = pd_store_url( $path, $campaign );
	ob_start(); ?>
	<aside class="pd-store-box" style="margin:2rem 0;padding:1.4rem 1.6rem;border-radius:16px;background:linear-gradient(135deg,#312e81,#4f46e5);color:#fff">
		<h3 style="margin:0 0 .4rem;font-size:1.3rem;color:#fff">Want a finished project instead of starting from scratch?</h3>
		<p style="margin:0 0 1rem;color:#e0e7ff">The ProjectDuniya Store has ready-made final year and mini projects with source code, report, PPT and viva notes. See the price and buy on WhatsApp.</p>
		<a href="<?php echo $href; ?>" style="display:inline-block;padding:.75rem 1.2rem;border-radius:10px;background:#fff;color:#3730a3;font-weight:700;text-decoration:none">Browse the Store &#8599;</a>
	</aside>
	<?php
	return ob_get_clean();
}

// 1 and 2: single posts.
add_filter( 'the_content', function ( $content ) {
	if ( ! is_singular( 'post' ) || ! in_the_loop() || ! is_main_query() ) {
		return $content;
	}
	$path = pd_store_category_path( get_the_ID() );

	$parts = explode( '</p>', $content );
	if ( count( $parts ) > 4 ) {
		$nudge = '<p class="pd-store-nudge" style="padding:.7rem 1rem;background:#eceafd;border-radius:10px;font-size:.95rem"><strong>Looking for a ready-made project?</strong> <a href="' . pd_store_url( $path, 'blog_post_inline' ) . '">See projects in the ProjectDuniya Store &#8599;</a></p>';
		array_splice( $parts, 3, 0, array( $nudge ) );
		$content = implode( '</p>', $parts );
	}
	return $content . pd_store_box( $path, 'blog_post_box' );
}, 20 );

// 3: shortcode.  Usage: [pd_store_promo] or [pd_store_promo category="data-analytics"]
add_shortcode( 'pd_store_promo', function ( $atts ) {
	$a    = shortcode_atts( array( 'category' => '' ), $atts );
	$path = $a['category'] ? '/category/' . sanitize_title( $a['category'] ) : '/projects';
	return pd_store_box( $path, 'blog_shortcode' );
} );

// 4: menu link. Change 'primary' to your theme's menu location slug if needed.
add_filter( 'wp_nav_menu_items', function ( $items, $args ) {
	if ( isset( $args->theme_location ) && 'primary' === $args->theme_location ) {
		$items .= '<li class="menu-item"><a href="' . pd_store_url( '/', 'blog_menu' ) . '">Store</a></li>';
	}
	return $items;
}, 10, 2 );
