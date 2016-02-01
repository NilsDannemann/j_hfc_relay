---
title: "Home"
permalink: "/"
layout: sidebar_double
position: 1
children: false
---
<div class="box">x</div>
<div class="box">x</div>
<div class="box">x</div>
<div class="box">xfefef</div>
<div class="box">x</div>
<div class="box">x</div>
<h1>Home</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, maiores.</p>

{% include components/teaser/teaser_triple.html title="Teaser #1" image="placeholder.png" text="lorem" link="#" linktext="Weiterlesen" %}
{% include components/teaser/teaser_triple.html title="Teaser #2" image="placeholder.png" text="lorem" link="#" linktext="Weiterlesen" %}
{% include components/teaser/teaser_triple.html title="Teaser #3" image="placeholder.png" text="lorem" link="#" linktext="Weiterlesen" %}

{% include components/teaser/teaser_double.html title="Teaser #4" image="placeholder.png" text="lorem" link="#" linktext="Weiterlesen" %}
{% include components/teaser/teaser_double.html title="Teaser #5" image="placeholder.png" text="lorem" link="#" linktext="Weiterlesen" %}

<h1>Headline</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus eaque vero perspiciatis sequi at odio mollitia odit tenetur aliquid. Assumenda quo reprehenderit officia illo architecto temporibus, vero vitae tenetur facere.</p>

<hr>

<section>
	<h2>Component Parts</h2>
	{% include components/button/buttongroup.html style="outlined" color="brand" %}
	{% include components/button/button.html title="I'm a Button" link="about" style="filled" color="brand" %}
</section>
