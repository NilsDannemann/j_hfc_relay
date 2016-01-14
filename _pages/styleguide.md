---
title:  "Styleguide"
permalink: "/styleguide/"
layout: styleguide
position: 99
children: false
---

<!-- ASSIGN COMPONENTS -->
{% assign componentsByType = site.components | sort:"title" | group_by:"type" %}

<!-- Content: Sidebar -->
<aside class="sidebar">
	<div class="sidebar__inner">
		<!-- component_nav -->
		{% include styleguide/component_nav/component_nav.html %}
		<!-- component_list -->
		{% include styleguide/component_list/component_list.html %}
	</div>
</aside>

<!-- Content: Page -->
<div class="content__page">
	<h1>Developer Styleguide</h1>
	<p>1. Include: <a href="{{ site.github_repo }}/_includes/_config.scss" target="_blank">config.scss</a></p>
	<p>2. Include: <a href="{{ site.github_repo }}/_includes/_base.scss" target="_blank">base.scss</a></p>

	<!-- DISPLAY COMPONENTS -->
	{% for type in componentsByType %}
		<h2 id="styleguide-section-{{ type.name }}">{{ type.name | capitalize }}</h2>
		{% for entry in type.items %}
			{% include styleguide/component_mask/component_mask.html %}
		{% endfor %}
	{% endfor %}
</div>
