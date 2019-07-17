$(function() {
  const t = {
    testTitle: {
      eng: '<span>How many people ride</span> <span>their bike to work?</span>',
      fr: '<span>French</span>',
      nl:
        '<span>Hoe veel mensen gaan met de </span><span>fiets naar het werk?</span>'
    },
    descriptionTrn: {
      eng:
        'Citizens using bikes to commute to work within Brussels city increased from 2005 (1.2%) till 2014 (3%). This rise shows an augmentation in the demand for sustainable solutions when moving from home to work. Hence, the melioration of bikes infrastructures within the Brussels region enhance this steady increase.',
      fr: '<span>French</span>',
      nl:
        'Inwoners die fietsen gebruiken om naar Brussel te pendelen, steeg van 2005 (1,2%) tot in 2017 (4,4%). Deze stijging toont een toename van de vraag naar duurzame oplossingen bij het verplaatsen van thuis naar het werk. Vandaar dat de verbetering van de fietsinfrastructuur in het Brussels Gewest deze gestage toename versterkt.'
    },
    evolutionTrn: {
      eng:
        'The total amount of cyclable paths is calculated in kilometers and includes the ones separated from the main roads as well as the suggested paths and the Regional Cyclable Itineraries (RCI). The RCIs are suggested paths for cyclists willing to commute on a medium to long distance. They take into account the calmest streets and the less stressful paths for the users. A significant year to mention is 2002, where the political boldness allowed the apparition of a project considered as not realistic at its time. Hence, the suppression of one row of the Rue de la Loi attributed to cars in order to construct a larger sideways shared by cyclists and pedestrians.',
      nl:
        'Het totale aantal fietspaden wordt berekend in kilometers en omvat de kilometers die gescheiden zijn van de hoofdwegen, evenals de voorgestelde paden en de Regionale Cyclable Routes (RCI). De RCIs zijn voorgestelde paden voor fietsers die bereid zijn om op middellange tot lange afstand te pendelen. Ze houden rekening met de rustigste straten en de minder stressvolle paden voor de gebruikers. Een belangrijk jaar om op te noemen is 2002, waar de politieke durf om de verschijning van een project op dat moment als niet realistisch werd beschouwd. Vandaar dat de onderdrukking van één rij van de Rue de la Loi wordt toegeschreven aan auto' +
        's om een grotere zijweg te bouwen die wordt gedeeld door fietsers en voetgangers.'
    },
    villoTrn: {
      eng:
        'Villo! is a rental programme run in the region of Brussels capital. It aims at enhancing and encouraging sustainable mobility to citizens. Bikes can be rented out from the actual 360 existing stations. The graph displays the total amount of Villo! users recorded from 2010 till 2017. The steady rise between this period of time is related to the increasing demand as well as the rise of the number of stations available.',
      nl:
        'Villo! is een verhuurprogramma in de regio van de hoofdstad van Brussel. Het is gericht op het verbeteren en stimuleren van duurzame mobiliteit voor inwoners. Fietsen kunnen worden gehuurd van de werkelijke 360 bestaande stations. De grafiek geeft de totale hoeveelheid Villo! gebruikers weer van het jaar 2010 tot 2017. De gestage stijging tussen deze periode is gerelateerd aan de toenemende vraag evenals de opkomst van het aantal beschikbare stations.'
    }
  };
  const _t = $('body').translate({lang: 'eng', t: t});
  const str = _t.g('translate');
  console.log(str);

  $('.lang_selector').click(function(ev) {
    const lang = $(this).attr('data-value');
    _t.lang(lang);

    console.log(lang);
    ev.preventDefault();
  });
});
