<?php
/**
 * Created by PhpStorm.
 * User: Akiba
 * Date: 14-8-2
 * Time: 下午9:28
 * A Tag Template
 */
get_header(); ?>
<div class="container">
    <section id="post">
        <article id="cat-<?php the_category_ID(); ?> " class="item show-up kanban">
            <div class="in-cat">
                <h2>Tag:<span> <?php single_tag_title(); ?></span></h2>
                <?php echo tag_description( $tag_id ); ?>
            </div>
        </article>
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" class="item show-up">
                <div class="wrap-content clearfix">
                    <div class="heading">
                        <div class="avatar-icon">
                            <a href="<?php the_permalink(); ?>" title="永久链接：<?php the_title(); ?>"><?php echo get_avatar( 'lxclxc89816@gmail.com', 46 ); ?></a>
                            <span class="back"><a href="<?php the_permalink() ?>" title="永久链接：<?php the_title(); ?>">更多</a></span>
                        </div>
                        <div class="post-title">
                            <div class="title-wrap">
                                <div class="title">
                                    <a href="<?php the_permalink() ?>" title="永久链接：<?php the_title(); ?>"><?php the_title(); ?></a>
                                </div>
                                <time>
                                    <?php the_time('F j, Y') ?>
                                </time>
                            </div>
                        </div>
                        <div class="tag">
                            <?php the_tags('<ul><li><div class="tag-bar"></div>','</li><li><div class="tag-bar"></div>','</li></ul>'); ?>
                        </div>
                    </div>
                    <div class="post-content">
                        <div class="excerpt">
                            <?php if(has_excerpt()) : ?>
                                <?php the_excerpt(); ?>
                            <?php else : ?>
                                <?php echo cut_str(strip_tags(apply_filters('the_content',$post->post_content)),180); ?>
                            <?php endif; ?>
                        </div>
                    </div>
                    <div class="post-thumb">
                        <?php if ( has_post_thumbnail() ) { ?>
                            <?php if ( has_post_thumbnail() ){ the_post_thumbnail('home-thumbnail', array('class'=>'thumb')); } ?>
                        <?php } else { ?>
                            <img src="<?php bloginfo( 'template_url' ); ?>/images/no-picture.jpg" class="thumb"/>
                        <?php } ?>
                    </div>
                    <div class="post-meta">
                        <div class="post-comment">
                            <?php comments_popup_link( ' 0', ' 1', ' %', 'fa-share'); ?>
                        </div>
                        <div class="post-read">
                            <a class="read-more fa-plus-square-o" href="<?php the_permalink(); ?>"  title="继续阅读：<?php the_title(); ?>"> <span>更多</span></a>
                        </div>
                        <div class="post-cat">
                            <i class="fa-folder-open"></i> <?php the_category(' '); ?>
                        </div>
                    </div>
                </div>
            </article>
        <?php endwhile; ?>
        <?php else : ?>
            <article class="item i-404">
                <div class="wrap-content clearfix">
                    <div class="not-found">
                        <img src="<?php bloginfo('template_directory'); ?>/images/404-not-found.jpg" />
                    </div>
                </div>
            </article>
        <?php endif; ?>
    </section>
    <?php wpbeginner_numeric_posts_nav(); ?>
</div>

<?php get_footer(); ?>