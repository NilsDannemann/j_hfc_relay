---
title: "Home"
permalink: "/"
layout: sidebar_double
position: 1
children: false
---

<h1>Table</h1>
{% include components/table/table.html %}
<hr>


<h1>Buttons</h1>
<div class="buttongroup">
	{% include components_parts/button/button.html title="Button" link="about" style="outlined" color="brand" %}
	{% include components_parts/button/button.html title="Button" link="about" style="outlined" color="brand" %}
	{% include components_parts/button/button.html title="Button" link="about" style="outlined" color="brand" %}
</div>
	{% include components_parts/button/button.html title="Button" link="about" style="filled" color="brand" %}
	{% include components_parts/button/button.html title="Button" link="about" style="filled" color="brand" %}
	{% include components_parts/button/button.html title="Button" link="about" style="filled" color="brand" %}
<hr>


<h1>3x Teaser</h1>
{% include components/teaser/teaser_triple.html title="Teaser #1" image="placeholder.png" text="lorem" link="#" linktext="Weiterlesen" %}
{% include components/teaser/teaser_triple.html title="Teaser #2" image="placeholder.png" text="lorem" link="#" linktext="Weiterlesen" %}
{% include components/teaser/teaser_triple.html title="Teaser #3" image="placeholder.png" text="lorem" link="#" linktext="Weiterlesen" %}
<hr>


<h1>2x Teaser</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste non, laudantium quia minima animi, ad dolorem, tempore velit quae odio sequi quis perferendis maxime, commodi dicta aliquid nam facere enim.</p>
{% include components/teaser/teaser_double.html title="Title" image="placeholder.png" text="lorem" link="#" linktext="Weiterlesen" %}
{% include components/teaser/teaser_double.html title="Title" image="placeholder.png" text="lorem" link="#" linktext="Weiterlesen" %}
