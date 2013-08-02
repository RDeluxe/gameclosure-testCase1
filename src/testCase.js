import GCDataSource;
import device;

import ui.View;
import ui.widget.ButtonView as ButtonView;
import ui.TextView as TextView;

import ui.widget.ListView as ListView;
import ui.widget.CellView as CellView;


exports = Class(ui.View, function(supr) {

  this.init = function(opts) {
    opts = merge(opts, {
      x: 0,
      y: 0
    });

    supr(this, 'init', [opts]);

    //Set up the datasource.
    this._source = new GCDataSource({
      //Entries require a key, which defaults to "id".
      key: "name",
      //Sort chronologically, then alphabetize
      sorter: function(data) {
        return ("0000000000" + data.distance).substr(-10);
      }
    });
    //And load our data.
    this._source.add(nearPlaces);


    //Creat the List
    var list = new ListView({
      superview: this,
      x: 0,
      y: 0,
      zIndex: 1,
      width: device.width,
      height: device.height,
      backgroundColor: "#D0D0D0",
      //Use the dataSource:
      dataSource: this._source,
      selectable: "multi",
      maxSelections: 1,
      scrollX: false,
      getCell: bind(this, "getCell")
    });

    this._list = list;

    this.buildView = function() {

    };
  };

  //## Class: PlaceCell
  //Subclass a Cell which is a view, it can have child views, and accepts data from a List.
  var PlaceCell = Class(CellView, function(supr) {
    this.init = function(opts) {
      supr(this, "init", [opts]);

      this._text = new TextView({
        superview: this,
        width: opts.width*3/4,
        height: opts.height,
        size: 40
      });
      this._button = new ButtonView({
        superview: this,
        x: opts.width*3/4,
        width: opts.width/4,
        height: opts.height,
        size: 40,
        backgroundColor: '#804040'
      });

    };

    //Called when a cell is put on screen.
    //We'll use it to update our TextView child.
    this.setData = function(data) {
      this._data = data; // Store it for the input event handler
      this._button.setTitle(data.distance);
      this._text.setText(data.name);
    };

    //Called when the cell is selected...
    this._onSelect = function() {
      console.log("Selected");
      this.deselect();
    };

    //Called when the cell is deselected...
    this._onDeselect = function() {};
  });

  /*
   * Function which returns a cell
   */
  this.getCell = function() {
    var list = this._list;

    return new PlaceCell({
      superview: list,
      width: device.width,
      height: 60
    });
  };

  //These are the example places which will be displayed in the list.
  //These are the example places which will be displayed in the list.
  var nearPlaces = [{
      name: "Mcdo",
      distance: 20,
      bonus: "Nourriture",
      lat: 47.20696,
      lon: -1.560413
    }, {
      name: "Arabe",
      distance: 30,
      bonus: "Nourriture",
      lat: 47.21,
      lon: -1.560413
    }, {
      name: "Quick",
      distance: 40,
      bonus: "Nourriture",
      lat: 47.2123,
      lon: -1.560413
    }, {
      name: "Pharmacie",
      distance: 100,
      bonus: "Santé",
      lat: 47.2062,
      lon: -1.548
    }, {
      name: "Cinéma",
      distance: 10,
      bonus: "Nourriture",
      lat: 47.1924,
      lon: -1.5532
    }, {
      name: "Audencia",
      distance: 55,
      bonus: "Capacité",
      lat: 47.2204,
      lon: -1.56039
    }, {
      name: "Maison",
      distance: 25,
      bonus: "Nourriture",
      lat: 47.20433,
      lon: -1.560618
    }, {
      name: "Chez God",
      distance: 75,
      bonus: "Drogue",
      lat: 47.18935,
      lon: -1.550413
    }, {
      name: "CyberCafé",
      distance: 150,
      bonus: "Capacité",
      lat: 47.23626,
      lon: -1.561413
    }, {
      name: "Magasin 1",
      distance: 200,
      bonus: "Armure",
      lat: 47.20696,
      lon: -1.569413
    }, {
      name: "Magasin 2",
      distance: 4000,
      bonus: "Armure",
      lat: 47.22696,
      lon: -1.548413
    }, {
      name: "Magasin 3",
      distance: 503,
      bonus: "Armes",
      lat: 47.19696,
      lon: -1.550413
    }, {
      name: "Magasin 4",
      distance: 735,
      bonus: "Armes",
      lat: 47.21996,
      lon: -1.552413
    }, {
      name: "Magasin 5",
      distance: 42,
      bonus: "Surprise",
      lat: 47.23696,
      lon: -1.590413
    }
  ];

});