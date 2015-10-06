# HFC Relay - Readme

Coming.


# Component Goals
- Better clickable Areas
- Better accessibility (HTML Outliner)
- Intelligent Behavior (responsive, equal height, text-overflow)
- Intelligent Fallbacks (e.g. no image)
- UI Animations


# Developer Snippets

##Grid

Fraction-based Grid System
```sass
@include column('1/4');
```
###Options 
Specify gutter:
```sass
@include column('1/4', 10px);
```



##Flexbox 

Use Flexbox with Fallback:
Default: row
```sass
@include flexbox($direction);
```


Specify Flexbox width:
Default: 50%
```sass
@include flexbox-width($width);
```


Specify Flexbox order:
Default: 1 up
```sass
@include flexbox-order($order);
```


