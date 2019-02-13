function iskana(s){
  return ['hiragana', 'katakana'].includes(s);
}

function tracesNumberChange(newVal){
  let boxes = $('#content .kanji-box.kanji-character');
  let maxLength = $('#kanjiTemplate .kanji-box.kanji-character').length;
  boxes.each(function(i, el){
    let n = i % maxLength;
    if(n <= newVal){
      $(el).text($(el).data('char'));
    }else{
      $(el).text('');
    }
  });
}
function rowsNumberChange(newVal){

}

window.Kanji =  {

  SELECTOR_TEMPLATE:    $('#selectorTemplate').html().trim(),
  KANJI_TEMPLATE:       $('#kanjiTemplate').html().trim(),
  $kanjiSelectionBox:   $('#kanjiSelectionBox'),
  $contentBox:          $('#content'),
  $category:            $('#kanjiSelectionBox .category'),

  _getKanjiData: function($selectedKanji) {
    var kanji = {category: $selectedKanji.parent().parent().data('category')};
    if(iskana(kanji['category'])){
      kanji['character'] = $selectedKanji.data('character');
      kanji['romaji']   = $selectedKanji.data('romaji');
    }else{
      kanji['character'] = $selectedKanji.data('character');
      kanji['meaning']   = $selectedKanji.data('meaning');
      kanji['onyomi']    = $selectedKanji.data('onyomi');
      kanji['kunyomi']   = $selectedKanji.data('kunyomi');
    }

      Kanji._setKanjiRow(kanji);
  },

  _handleKanjiSelection: function() {
    Kanji.$kanjiSelectionBox.on('click', '.kanji-box', function(ev) {
      var $selectedKanji = $(ev.currentTarget);
      Kanji._selectKanji($selectedKanji);
    });
  },

  _selectKanji: function($selectedKanji) {
    var existingKanji  = $selectedKanji.data('character');
    var selected       = $selectedKanji.hasClass('selected');

    $selectedKanji.toggleClass('selected');

    if (existingKanji && !selected) {
      Kanji._getKanjiData($selectedKanji);
    }

    else if (existingKanji && selected) {
      Kanji._removeKanjiRow(existingKanji);
    }
  },

  _handleSectionExpansion: function() {
    Kanji.$category.on('click', function() {
      var $selectedCategory = $(this);

      Kanji.sectionExpansion($selectedCategory);

      Kanji.$category.siblings('.category-content').removeClass('expand');
      $selectedCategory.siblings('.category-content').addClass('expand');
    });
  },

  sectionExpansion: function($selectedCategory) {
    Kanji.$category.siblings('.category-content').removeClass('expand');
    $selectedCategory.siblings('.category-content').addClass('expand');
  },

  _handleMeshToggle: function() {
    var $strokeToggle = $('.meshToggle');

    $strokeToggle.on('click', function() {
      Kanji.toggleMesh();
    });
  },

  toggleMesh: function() {
    var $strokeToggle = $('.meshToggle');

    $strokeToggle.toggleClass('selected');
    $('.kanji-box').toggleClass('mesh');
  },

  _handleStrokeToggle: function() {
    var $strokeToggle = $('.strokeToggle');

    $strokeToggle.on('click', function() {
      Kanji.toggleStroke();
    });
  },

  toggleStroke: function() {
    var $strokeToggle = $('.strokeToggle');

    $strokeToggle.toggleClass('selected');
    Kanji.$contentBox.toggleClass('stroke-order');
  },

  _removeKanjiRow: function(existingKanji) {
    $('.kanji-row[data-character="'+ existingKanji +'"]').remove();
  },

  _setKanjiRow: function(kanji) {
    var $kanjiRow       = $(Kanji.KANJI_TEMPLATE);
    var $kanjiCharacter = $kanjiRow.find('.kanji-character');
    $kanjiCharacter.text(kanji.character);
    $kanjiCharacter.data('char', kanji.character);
    var $kanjiMeaning   = $kanjiRow.find('.kanji-meaning');
    var $kanjiOnyomi    = $kanjiRow.find('.kanji-onyomi');
    var $kanjiKunyomi   = $kanjiRow.find('.kanji-kunyomi');
    var $kanjiRomaji = $kanjiRow.find('.kanji-romaji');
    let $kanjiDescr = $kanjiRow.find('.kanji-descr');
    let $kanaDescr = $kanjiRow.find('.kana-descr');
    if(iskana(kanji.category)){
      $kanjiDescr.hide();
      $kanaDescr.show();
      $kanjiRomaji.text(kanji.romaji);
    }else{
      $kanaDescr.hide();
      $kanjiDescr.show();
      $kanjiMeaning.text(kanji.meaning);
      $kanjiOnyomi.text(kanji.onyomi);
      $kanjiKunyomi.text(kanji.kunyomi);
    }
    $kanjiRow.attr('data-character', kanji.character);

    Kanji.$contentBox.prepend($kanjiRow);

    tracesNumberChange($('#number-of-traces').val());
  },

  _setKanjiSelector: function(kanji) {
    var $categoryBox = Kanji.$kanjiSelectionBox.find('[data-category="'+ kanji.category +'"] .category-content');
    $categoryBox.append(Kanji.SELECTOR_TEMPLATE);

    var $kanjiSelector = $categoryBox.children().last('li');
    if(iskana(kanji.category)){
      $kanjiSelector.attr({
        'data-character': kanji.character,
        'data-romaji':   kanji.romaji
      });
    }else{
      $kanjiSelector.attr({
        'data-character': kanji.character,
        'data-meaning':   kanji.meaning,
        'data-onyomi':    kanji.onyomi,
        'data-kunyomi':   kanji.kunyomi
      });
    }

    $kanjiSelector.text(kanji.character);
  },

  _handleKanjiSearch: function() {
    var $kanjiSearch = $('.kanjiSearch');
    var $kanjiSubmit = $('.kanjiSubmit');

    $kanjiSubmit.on('click', function() {
      var kanji = $kanjiSearch.val();

      Kanji._searchKanji(kanji);
    });
  },

  _searchKanji: function(kanji) {
    var $searchedKanji = this.$kanjiSelectionBox.find('[data-character="'+ kanji +'"]');
    var kanjiExists    = $searchedKanji.length

    if(kanjiExists){
      Kanji._selectKanji($searchedKanji);
    }
  },

  _load: function() {
    $.getJSON('data/kanji.json', function(data) {
      $.each( data.kanji, function( i, kanji ) {
	       Kanji._setKanjiSelector(kanji, null);
      });
      $.each( data.kana.hiragana, function( i, kanji ) {
        kanji.category = 'hiragana';
	       Kanji._setKanjiSelector(kanji);
      });
      $.each( data.kana.katakana, function( i, kanji ) {
        kanji.category = 'katakana';
	       Kanji._setKanjiSelector(kanji);
      });
    }).done(function(){
      Kanji._handleKanjiSelection();
      Kanji._handleSectionExpansion();
      Kanji._handleKanjiSearch();
      Kanji._handleStrokeToggle();
      Kanji._handleMeshToggle();
      tracesNumberChange(2);
      rowsNumberChange(2);

    });
  }
};
