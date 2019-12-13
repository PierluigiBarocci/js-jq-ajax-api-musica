

// BONUS: aggiungere una tendina con i generi: pop, rock, metal e jazz, che permette all'utente di filtrare i dischi visualizzati in base al genere selezionato.

// ho preso direttamente il layout d'esempio

// strumenti utili alla creazione della funzione Handlebars
var template_html = $("#template").html();
var template_function = Handlebars.compile(template_html);

// Eseguire una chiamata ajax all'api di boolean: https://flynn.boolean.careers/exercises/api/array/music che restituisce una lista di 10 dischi musicali.
// Utilizzando handlebars, disegnare in pagina una card per ogni disco.

$.ajax({
    'url': 'https://flynn.boolean.careers/exercises/api/array/music',
    'method': 'GET',
    'success': function(data){
        var array = data.response;
        // ciclo for per scorrere l'array
        for (var i = 0; i < array.length; i++) {
            // ad ogni passaggio, analizzo un singolo oggetto
            var disco = array[i];
            // creo un oggetto con tutti i valori che mi interesseranno
            // che darò poi in pasto alla funzione Handlebars
            var properties = {
                'cover': disco.poster,
                'author': disco.author,
                'title': disco.title,
                'year': disco.year,
                'genre': disco.genre
            };
            var final = template_function(properties);
            // lo appendo al container
            $('.cds-container.container').append(final);
        }
    },
    'error': function(){
        alert('error');
    }
});
