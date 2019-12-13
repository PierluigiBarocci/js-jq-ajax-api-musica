// Ho preso direttamente il layout d'esempio

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

// BONUS: aggiungere una tendina con i generi: pop, rock, metal e jazz, che permette all'utente di filtrare i dischi visualizzati in base al genere selezionato.

// come visto stamattina in classe, change si adatta bene al select
// e al cambio del value
$('#selector').change(function(){
    // mi porto dietro il valore che ho selezionato
    var valore = $(this).val();
    // se il valore è una stringa vuota, quindi il primo elemento nel nostro html
    if (valore == '') {
        // mostra tutti i cd
        $('.cd').fadeIn();
    } else{
        // selezione ogni cd presente
        $('.cd').each(function(){
            // mi porto dietro il data-genre di ogni cd per confrontarlo
            var data_cd_corrente = $(this).attr('data-genre');
            // se il val corrisponde (il lowercase qui è fondamentale)
            if (data_cd_corrente.toLowerCase() == valore.toLowerCase()) {
                // mostralo
                $(this).fadeIn();
            } else {
                // altrimenti nascondilo
                $(this).fadeOut();
            }
        });
    };
});
