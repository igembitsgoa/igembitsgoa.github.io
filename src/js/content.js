import "../css/content.scss";
import "./main";

// format links
$('.content h1, .content h2').each(function () {
    var text = $(this).text();
    $(this).text(text + ' ');
    var id = text.trim().replace(/ /g, '');
    
    if ($(this).prop('tagName') == 'H2') {
        id = $(this).prevAll('h1:first').attr('id') + "-" + id;
    }
    
    $(this).attr('id', id);
    
    var height = $(this).height();
    var link = document.createElement('a');
    link.classList.add('anchor');
    $(link).attr('href', "#" + id);
    $(link).attr('aria-hidden', "true");
    $(link).css('margin-left', -height*0.5);
    $(link).css('margin-top', height*0.265);
    $(link).css('border-right-width', height*0.1);
    $(link).css('height', height*0.5);
    $(link).css('width', height*0.5);
    $(this).prepend(link);

    // add to table of contents if h1
    if ($(this).prop('tagName') == 'H1') {
        var item = document.createElement('li');
        
        var span1 = document.createElement('span');
        span1.classList.add('circle');
        $(span1).attr('aria-hidden', 'true');

        var span2 = document.createElement('span');
        span2.classList.add('icon', 'arrow');
        span1.append(span2);
        item.append(span1);

        var a = document.createElement('a');
        $(a).attr('href', '#' + id);
        $(a).text(text);

        item.append(a);

        $('#contents ul').append(item);
    }

});


// format in-text citations
$('.content a').each(function () {
    var link = $(this).prop('href');
    var matches = link.match('#citation(.*)')
    console.log(matches);
    if (matches) {
        $(this).addClass('citation');
        $(this).attr('id', 'intext' + matches[1]);
        var text = $(this).text();
        $(this).text('(' + text + ')');
    }
});

// format definitions
$('dfn').each(function () {
    var text = $(this).text();
    var matches = text.match('(.*)(~)(.*)');
    $(this).text(matches[1].trim());
    $(this).attr('title', matches[3].trim());
    $(this).attr('data-toggle', 'tooltip');

    $(this).tooltip();
});

$('.content .section').tooltip();

$('.content .section').click(function () {
    $(this)
        .tooltip('hide')
        .attr("data-original-title", "Doesn't work yet :/")
        .tooltip('show');
});

$('.content .section').mouseout(function () {
    $(this)
        .attr("data-original-title", "Copy a link to this section!");
});

spans = document.querySelectorAll('nobr .math span')
for (i = 0; i < spans.length; i++) {
    spans[i].style.borderLeftWidth = '0px';
}

