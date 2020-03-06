// ==UserScript==
// @name Cotg MAfunky
// @namespace https://github.com/Mohnki/Mfunky
// @version 1.0.3
// @description Cotg Mfunky with Avatar edits
// @author Mohnki+
// @match https://w20.crownofthegods.com/*
// @match https://w12.crownofthegods.com/*
// @match https://w19.crownofthegods.com/*
// @match https://w18.crownofthegods.com/*
// @match https://w17.crownofthegods.com/*
// @include https://w/*.crownofthegods.com/World*
// @grant none
// @updateURL https://github.com/Mohnki/Mfunky/raw/master/mfunky.user.js
// @downloadURL https://github.com/Mohnki/Mfunky/raw/master/mfunky.user.js
// ==/UserScript==

(function() {


  /**
   * @param {string} data
   * @return {?}
   */
  function DecodeWorldData(data) {
    var WorldData = {
      bosses : [],
      cities : [],
      ll : [],
      cavern : [],
      portals : [],
      shrines : []
    };
    var temp = data.split("|");
    var keys = temp[1].split("l");
    var ckey = keys[0];
    var skey_ = keys[1];
    var bkey_ = keys[2];
    var lkey_ = keys[3];
    var cavkey_ = keys[4];
    var pkey_ = keys[5];
    var cities_ = temp[0].split("l");
    var shrines_ = temp[2].split("l");
    var bosses_1 = temp[3].split("l");
    var lawless_ = temp[4].split("l");
    var caverns_ = temp[5].split("l");
    var portals_ = temp[6].split("l");
    /** @type {number} */
    var dat_ = 0;
    var i_3;
    for (i_3 in bosses_1) {
      /** @type {string} */
      dat_ = Number(bosses_1[i_3]) + Number(bkey_) + "";
      /** @type {string} */
      bkey_ = dat_;
      WorldData.bosses.push("1" + dat_);
    }
    for (i_3 in cities_) {
      /** @type {string} */
      dat_ = Number(cities_[i_3]) + Number(ckey) + "";
      /** @type {string} */
      ckey = dat_;
      WorldData.cities.push("2" + dat_);
    }
    for (i_3 in lawless_) {
      /** @type {string} */
      dat_ = Number(lawless_[i_3]) + Number(lkey_) + "";
      /** @type {string} */
      lkey_ = dat_;
      WorldData.ll.push("3" + dat_);
    }
    for (i_3 in caverns_) {
      /** @type {string} */
      dat_ = Number(caverns_[i_3]) + Number(cavkey_) + "";
      /** @type {string} */
      cavkey_ = dat_;
      WorldData.cavern.push("7" + dat_);
    }
    for (i_3 in portals_) {
      /** @type {string} */
      dat_ = Number(portals_[i_3]) + Number(pkey_) + "";
      /** @type {string} */
      pkey_ = dat_;
      WorldData.portals.push("8" + dat_);
    }
    for (i_3 in shrines_) {
      /** @type {string} */
      dat_ = Number(shrines_[i_3]) + Number(skey_) + "";
      /** @type {string} */
      skey_ = dat_;
      WorldData.shrines.push("9" + dat_);
    }
    return WorldData;
  }
  /**
   * @param {!Date} date_2
   * @return {?}
   */
  function getFormattedDate_(date_2) {
    var year_1 = date_2.getFullYear();
    var month_1 = (1 + date_2.getMonth()).toString();
    month_1 = month_1.length > 1 ? month_1 : "0" + month_1;
    var day_ = date_2.getDate().toString();
    day_ = day_.length > 1 ? day_ : "0" + day_;
    return month_1 + "/" + day_ + "/" + year_1;
  }
  /**
   * @param {number} num_5
   * @return {?}
   */
  function roundToTwo_(num_5) {
    return +(Math.round(num_5 + "e+2") + "e-2");
  }
  /**
   * @param {string} j_
   * @return {undefined}
   */
  function errorgo_(j_) {
    var errormsgs_;
    errz_ = errz_ + 1;
    /** @type {string} */
    var b_ = "errBR" + errz_;
    /** @type {string} */
    var c_ = "#" + b_;
    /** @type {string} */
    var d_ = "#" + b_ + " div";
    /** @type {string} */
    errormsgs_ = '<tr ID = "' + b_ + '"><td><div class = "errBR">' + j_ + "<div></td></tr>";
    $("#errorBRpopup").append(errormsgs_);
    $(c_).show();
    $(d_).animate({
      opacity : 1,
      bottom : "+10px"
    }, "slow");
    setTimeout(function() {
      $(d_).animate({
        opacity : 0,
        bottom : "-10px"
      }, "slow");
      $(c_).fadeOut("slow");
    }, 5000);
    setTimeout(function() {
      $(c_).remove();
    }, 6000);
  }
  /**
   * @param {?} str_6
   * @return {undefined}
   */
  function Aimp_(str_6) {
    /** @type {*} */
    var Aexp_ = JSON.parse(str_6);
    /** @type {number} */
    var i_4 = 1;
    for (; i_4 <= Aexp_.x.length; i_4++) {
      $("#t" + i_4 + "x").val(Aexp_.x[i_4 - 1]);
      $("#t" + i_4 + "y").val(Aexp_.y[i_4 - 1]);
      $("#type" + i_4).val(Aexp_.type[i_4 - 1]).change();
    }
    $("#attackHr").val(Aexp_.time[0]);
    $("#attackMin").val(Aexp_.time[1]);
    $("#attackSec").val(Aexp_.time[2]);
    $("#attackDat").val(Aexp_.time[3]);
  }
  /**
   * @param {!Object} t_
   * @return {undefined}
   */
  function neardeftable_(t_) {
    var cx_ = $("#ndefx").val();
    var cy_ = $("#ndefy").val();
    /** @type {number} */
    var cont_ = Number(Math.floor(cx_ / 100) + 10 * Math.floor(cy_ / 100));
    /** @type {!Array} */
    var cit_ = [[]];
    var i_5;
    for (i_5 in t_) {
      var tid_ = t_[i_5].id;
      /** @type {number} */
      var tempx_ = Number(tid_ % 65536);
      /** @type {number} */
      var tempy_ = Number((tid_ - tempx_) / 65536);
      /** @type {number} */
      var tcont_ = Number(Math.floor(tempx_ / 100) + 10 * Math.floor(tempy_ / 100));
      /** @type {number} */
      var ttspd_ = 0;
      if (cont_ == tcont_) {
        if (t_[i_5].Ballista_total > 0 || t_[i_5].Ranger_total > 0 || t_[i_5].Triari_total > 0 || t_[i_5].Priestess_total || t_[i_5].Arbalist_total > 0 || t_[i_5].Praetor_total > 0) {
          /** @type {number} */
          var tdist_ = Math.sqrt((tempx_ - cx_) * (tempx_ - cx_) + (tempy_ - cy_) * (tempy_ - cy_));
          /** @type {!Array} */
          var tempt_ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          tempt_[1] = t_[i_5].Ballista_total;
          tempt_[2] = t_[i_5].Ranger_total;
          tempt_[3] = t_[i_5].Triari_total;
          tempt_[4] = t_[i_5].Priestess_total;
          tempt_[8] = t_[i_5].Arbalist_total;
          tempt_[9] = t_[i_5].Praetor_total;
          /** @type {!Array} */
          var temph_ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          temph_[1] = t_[i_5].Ballista_home;
          temph_[2] = t_[i_5].Ranger_home;
          temph_[3] = t_[i_5].Triari_home;
          temph_[4] = t_[i_5].Priestess_home;
          temph_[8] = t_[i_5].Arbalist_home;
          temph_[9] = t_[i_5].Praetor_home;
          /** @type {number} */
          var tempts_ = 0;
          var j_1;
          for (j_1 in tempt_) {
            /** @type {number} */
            tempts_ = tempts_ + tempt_[j_1] * ttts_[j_1];
          }
          /** @type {number} */
          var tempth_ = 0;
          var h_6;
          for (h_6 in temph_) {
            /** @type {number} */
            tempth_ = tempth_ + temph_[h_6] * ttts_[h_6];
          }
          /** @type {number} */
          var tspeed_ = 0;
          for (j_1 in tempt_) {
            if (tempt_[j_1] > 0) {
              if (Number((ttspeed_[j_1] / ttspeedres_[j_1]).toFixed(2)) > tspeed_) {
                /** @type {number} */
                tspeed_ = Number((ttspeed_[j_1] / ttspeedres_[j_1]).toFixed(2));
              }
            }
          }
          cit_.push([tempx_, tempy_, tdist_, t_[i_5].c, tempt_, tempts_, tempth_, tid_, tdist_ * tspeed_]);
        }
      }
      if (cont_ != tcont_ || t_[i_5].Galley_total > 0 || t_[i_5].Stinger_total > 0) {
        if (t_[i_5].Stinger_total > 0 || t_[i_5].Galley_total > 0) {
          tdist_ = roundToTwo_(Math.sqrt((tempx_ - cx_) * (tempx_ - cx_) + (tempy_ - cy_) * (tempy_ - cy_)));
          /** @type {!Array} */
          tempt_ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          tempt_[1] = t_[i_5].Ballista_total;
          tempt_[2] = t_[i_5].Ranger_total;
          tempt_[3] = t_[i_5].Triari_total;
          tempt_[4] = t_[i_5].Priestess_total;
          tempt_[8] = t_[i_5].Arbalist_total;
          tempt_[9] = t_[i_5].Praetor_total;
          tempt_[14] = t_[i_5].Galley_total;
          tempt_[15] = t_[i_5].Stinger_total;
          /** @type {!Array} */
          temph_ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          temph_[1] = t_[i_5].Ballista_home;
          temph_[2] = t_[i_5].Ranger_home;
          temph_[3] = t_[i_5].Triari_home;
          temph_[4] = t_[i_5].Priestess_home;
          temph_[8] = t_[i_5].Arbalist_home;
          temph_[9] = t_[i_5].Praetor_home;
          temph_[14] = t_[i_5].Galley_home;
          temph_[15] = t_[i_5].Stinger_home;
          /** @type {number} */
          tempts_ = 0;
          for (j_1 in tempt_) {
            /** @type {number} */
            tempts_ = tempts_ + tempt_[j_1] * ttts_[j_1];
          }
          /** @type {number} */
          tempth_ = 0;
          for (h_6 in temph_) {
            /** @type {number} */
            tempth_ = tempth_ + temph_[h_6] * ttts_[h_6];
          }
          /** @type {number} */
          tspeed_ = 0;
          for (j_1 in tempt_) {
            if (tempt_[j_1] > 0) {
              if (Number((ttspeed_[j_1] / ttspeedres_[j_1]).toFixed(2)) > tspeed_) {
                /** @type {number} */
                tspeed_ = Number((ttspeed_[j_1] / ttspeedres_[j_1]).toFixed(2));
              }
            }
          }
          /** @type {number} */
          var timetssp_ = tdist_ * tspeed_ + 60;
          cit_.push([tempx_, tempy_, tdist_, t_[i_5].c, tempt_, tempts_, tempth_, tid_, timetssp_]);
        }
      }
    }
    cit_.sort(function(a_, b_1) {
      return a_[8] - b_1[8];
    });
    /** @type {string} */
    var neardeftab_ = "<table id='ndeftable'><thead><th></th><th>City</th><th>Coords</th><th>TS Total</th><th>TS Home</th><th id='ndefdist'>Travel Time</th><th>type</th></thead><tbody>";
    for (i_5 in cit_) {
      if (i_5 > 0) {
        /** @type {number} */
        var h1_ = Math.floor(cit_[i_5][8] / 60);
        /** @type {number} */
        var m1_ = Math.floor(cit_[i_5][8] % 60);
        /** @type {(number|string)} */
        h1_ = h1_ < 10 ? "0" + h1_ : h1_;
        /** @type {(number|string)} */
        m1_ = m1_ < 10 ? "0" + m1_ : m1_;
        /** @type {string} */
        neardeftab_ = neardeftab_ + ("<tr><td><button class='greenb chcity' id='cityGoTowm' a='" + cit_[i_5][7] + "'>Go To</button></td><td>" + cit_[i_5][3] + "</td><td class='coordblink shcitt' data='" + cit_[i_5][7] + "'>" + cit_[i_5][0] + ":" + cit_[i_5][1] + "</td>");
        /** @type {string} */
        neardeftab_ = neardeftab_ + ("<td>" + cit_[i_5][5] + "</td><td>" + cit_[i_5][6] + "</td><td>" + h1_ + ":" + m1_ + "</td><td><table>");
        for (j_1 in cit_[i_5][4]) {
          if (cit_[i_5][4][j_1] > 0) {
            /** @type {string} */
            neardeftab_ = neardeftab_ + ("<td><div class='" + tpicdiv20_[j_1] + "'></div></td>");
          }
        }
        /** @type {string} */
        neardeftab_ = neardeftab_ + "</table></td></tr>";
      }
    }
    /** @type {string} */
    neardeftab_ = neardeftab_ + "</tbody></table>";
    $("#Ndefbox").html(neardeftab_);
    $("#ndeftable td").css("text-align", "center");
    $("#ndeftable td").css("height", "25px");
    /** @type {(Element|null)} */
    var newTableObject_ = document.getElementById("ndeftable");
    sorttable.makeSortable(newTableObject_);
  }
  /**
   * @param {!Object} t_1
   * @return {undefined}
   */
  function nearofftable_(t_1) {
    /** @type {number} */
    var contoff_ = Number($("#noffx").val());
    /** @type {!Array} */
    var cit_1 = [[]];
    /** @type {!Array} */
    var troopmail_ = [[]];
    /** @type {number} */
    var counteroff_ = 0;
    var i_6;
    for (i_6 in t_1) {
      var tid_1 = t_1[i_6].id;
      /** @type {number} */
      var tempx_1 = Number(tid_1 % 65536);
      /** @type {number} */
      var tempy_1 = Number((tid_1 - tempx_1) / 65536);
      /** @type {number} */
      var tcont_1 = Number(Math.floor(tempx_1 / 100) + 10 * Math.floor(tempy_1 / 100));
      if (contoff_ == tcont_1) {
        if (t_1[i_6].Druid_total > 0 || t_1[i_6].Horseman_total > 0 || t_1[i_6].Sorcerer_total > 0 || t_1[i_6].Vanquisher_total > 0 || t_1[i_6].Scorpion_total > 0 || t_1[i_6].Ram_total > 0) {
          /** @type {number} */
          counteroff_ = counteroff_ + 1;
          /** @type {!Array} */
          var tempt_1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          tempt_1[5] = t_1[i_6].Vanquisher_total;
          tempt_1[6] = t_1[i_6].Sorcerer_total;
          tempt_1[10] = t_1[i_6].Horseman_total;
          tempt_1[11] = t_1[i_6].Druid_total;
          tempt_1[12] = t_1[i_6].Ram_total;
          tempt_1[13] = t_1[i_6].Scorpion_total;
          /** @type {number} */
          var tempts_1 = 0;
          var j_2;
          for (j_2 in tempt_1) {
            /** @type {number} */
            tempts_1 = tempts_1 + tempt_1[j_2] * ttts_[j_2];
          }
          troopmail_.push([tempt_1, tempts_1]);
          cit_1.push([tempx_1, tempy_1, tempts_1, tempt_1, t_1[i_6].c, tid_1]);
        }
      }
      if (contoff_ == "99") {
        if (t_1[i_6].Warship_total > 0 || t_1[i_6].Galley_total > 0) {
          /** @type {number} */
          counteroff_ = counteroff_ + 1;
          /** @type {!Array} */
          tempt_1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          tempt_1[5] = t_1[i_6].Vanquisher_total;
          tempt_1[6] = t_1[i_6].Sorcerer_total;
          tempt_1[10] = t_1[i_6].Horseman_total;
          tempt_1[11] = t_1[i_6].Druid_total;
          tempt_1[12] = t_1[i_6].Ram_total;
          tempt_1[13] = t_1[i_6].Scorpion_total;
          tempt_1[14] = t_1[i_6].Galley_total;
          tempt_1[16] = t_1[i_6].Warship_total;
          /** @type {number} */
          tempts_1 = 0;
          for (j_2 in tempt_1) {
            /** @type {number} */
            tempts_1 = tempts_1 + tempt_1[j_2] * ttts_[j_2];
          }
          troopmail_.push([tempt_1, tempts_1]);
          cit_1.push([tempx_1, tempy_1, tempts_1, tempt_1, t_1[i_6].c, tid_1]);
        }
      }
    }
    cit_1.sort(function(a_1, b_2) {
      return b_2[2] - a_1[2];
    });
    $("#asdfg").text("Total:" + counteroff_);
    /** @type {string} */
    var nearofftab_ = "<table id='nofftable'><thead><th></th><th>City</th><th>Coords</th><th>TS</th><th>type</th></thead><tbody>";
    for (i_6 in cit_1) {
      if (i_6 > 0) {
        /** @type {string} */
        nearofftab_ = nearofftab_ + ("<tr><td><button class='greenb chcity' id='cityGoTowm' a='" + cit_1[i_6][5] + "'>Go To</button></td><td>" + cit_1[i_6][4] + "</td><td class='coordblink shcitt' data='" + cit_1[i_6][5] + "'>" + cit_1[i_6][0] + ":" + cit_1[i_6][1] + "</td>");
        /** @type {string} */
        nearofftab_ = nearofftab_ + ("<td>" + cit_1[i_6][2] + "</td><td><table>");
        for (j_2 in cit_1[i_6][3]) {
          if (cit_1[i_6][3][j_2] > 0) {
            /** @type {string} */
            nearofftab_ = nearofftab_ + ("<td><div class='" + tpicdiv20_[j_2] + "'></div></td>");
          }
        }
        /** @type {string} */
        nearofftab_ = nearofftab_ + "</table></td></tr>";
      }
    }
    /** @type {string} */
    nearofftab_ = nearofftab_ + "</tbody></table>";
    $("#Noffbox").html(nearofftab_);
    $("#nofftable td").css("text-align", "center");
    $("#nofftable td").css("height", "26px");
    /** @type {(Element|null)} */
    var newTableObject_1 = document.getElementById("nofftable");
    sorttable.makeSortable(newTableObject_1);
    troopmail_.sort(function(a_2, b_3) {
      return b_3[1] - a_2[1];
    });
    $("#mailoff").click(function() {
      var conttemp_ = $("#noffx").val();
      /** @type {string} */
      var dhruv_ = "<p>Number of offensive castles is '" + counteroff_ + "'</p>";
      /** @type {string} */
      dhruv_ = dhruv_ + '</p><table class="mce-item-table" style="width: 266.273px; "data-mce-style="width: 266.273px; "border="1" data-mce-selected="1"><thead><th>Number</th><th>Troop</th><th>TS Amount</th></thead><tbody>';
      var i_7;
      for (i_7 in troopmail_) {
        if (i_7 > 0) {
          /** @type {string} */
          dhruv_ = dhruv_ + ('<tr><td style="text-align: center;" data-mce-style="text-align: center;">' + i_7 + "</td>");
          /** @type {string} */
          dhruv_ = dhruv_ + '<td style="text-align: center;" data-mce-style="text-align: center;"><table>';
          var j_3;
          for (j_3 in troopmail_[i_7][0]) {
            if (troopmail_[i_7][0][j_3] > 0) {
              /** @type {string} */
              dhruv_ = dhruv_ + ("<td>" + ttname_[j_3] + "</td>");
            }
          }
          /** @type {string} */
          dhruv_ = dhruv_ + "</table></td>";
          /** @type {string} */
          dhruv_ = dhruv_ + ('<td style="text-align: center;" data-mce-style="text-align: center;">' + troopmail_[i_7][1] + "</td></tr>");
        }
      }
      /** @type {string} */
      dhruv_ = dhruv_ + "</tbody></table>";
      if (conttemp_ == 99) {
        /** @type {string} */
        conttemp_ = "Navy";
      }
      jQuery("#mnlsp")[0].click();
      jQuery("#composeButton")[0].click();
      var temppo_ = $("#mailname").val();
      $("#mailToto").val(temppo_);
      $("#mailToSub").val(conttemp_ + " Offensive TS");
      var $iframe_ = $("#mailBody_ifr");
      $iframe_.ready(function() {
        $iframe_.contents().find("body").append(dhruv_);
      });
    });
  }
  /**
   * @param {?} element_7
   * @return {undefined}
   */
  function clickevent_(element_7) {
    var event_ = jQuery.Event("click");
    /** @type {string} */
    event_.user = "foo";
  }
  /**
   * @param {!Object} defobj_
   * @return {undefined}
   */
  function SendDef_(defobj_) {
    /**
     * @return {undefined}
     */
    function dloop_() {
      var i_9;
      for (i_9 in t_2.home) {
        if (t_2.use[i_9] == 1) {
          $("#reiIP" + t_2.type[i_9]).val(t_2.amount[i_9]);
        }
      }
      $("#reinxcoord").val(targets_.x[l_]);
      $("#reinycoord").val(targets_.y[l_]);
      setTimeout(function() {
        $("#reinfcoordgo").trigger({
          type : "click",
          originalEvent : "1"
        });
      }, 100);
      $("#reinforcetimingselect").val(Number(defobj_.dep) + 1).change();
      if ($("#defdeparture").val() > 0) {
        /** @type {string} */
        var date_3 = defobj_.date + " " + defobj_.hr + ":" + defobj_.min + ":" + defobj_.sec;
        $("#reinfotimeinp").val(date_3);
      }
      var event_1 = jQuery.Event("logged");
      /** @type {string} */
      event_1.user = "foo";
      $("#reinforceGo").trigger({
        type : "click",
        originalEvent : "1"
      });
      l_++;
      if (l_ < end_4) {
        setTimeout(dloop_, 1500);
      } else {
        $("#commandsPopUpBox").hide();
        setTimeout(function() {
          art_();
        }, 4000);
      }
    }
    /**
     * @return {undefined}
     */
    function art_() {
      $("#commandsPopUpBox").hide();
      if (defobj_.ret == 1) {
        jQuery(".toptdinncommtbl1:first")[0].click();
        setTimeout(function() {
          $("#outgoingPopUpBox").hide();
        }, 500);
        /** @type {!Date} */
        var minddate_ = new Date;
        /** @type {boolean} */
        var first_3 = true;
        var i_10;
        for (i_10 in poll2_.OGA) {
          if (targets_.cstr.indexOf(poll2_.OGA[i_10][5]) > -1) {
            if (first_3) {
              /** @type {boolean} */
              first_3 = false;
              var a_3 = poll2_.OGA[i_10][6].substr(30);
              var b_4 = a_3.substr(0, a_3.indexOf("<"));
              var time_1 = b_4.split(" ");
              var ttime_ = time_1[2].split(":");
              minddate_.setHours(Number(ttime_[0]));
              minddate_.setMinutes(Number(ttime_[1]));
              minddate_.setSeconds(Number(ttime_[2]));
              if (time_1[1] == "Tomorrow") {
                minddate_.setDate(minddate_.getDate() + 1);
              } else {
                if (time_1[1] != "Today") {
                  var ddate_ = time_1[1].split("/");
                  minddate_.setDate(Number(ddate_[1]));
                  minddate_.setMonth(Number(ddate_[0]));
                }
              }
            } else {
              a_3 = poll2_.OGA[i_10][6].substr(30);
              b_4 = a_3.substr(0, a_3.indexOf("<"));
              time_1 = b_4.split(" ");
              ttime_ = time_1[2].split(":");
              /** @type {!Date} */
              var d_1 = new Date;
              d_1.setHours(ttime_[0]);
              d_1.setMinutes(ttime_[1]);
              d_1.setSeconds(ttime_[2]);
              if (time_1[1] == "Tomorrow") {
                d_1.setDate(minddate_.getDate() + 1);
              } else {
                if (time_1[1] != "Today") {
                  ddate_ = time_1[1].split("/");
                  d_1.setDate(ddate_[1]);
                  d_1.setMonth(ddate_[0]);
                }
              }
              if (d_1 < minddate_) {
                /** @type {!Date} */
                minddate_ = d_1;
              }
            }
          }
        }
        minddate_.setHours(minddate_.getHours() - defobj_.rettime);
        /** @type {number} */
        var hour_ = minddate_.getHours();
        if (hour_ < 10) {
          /** @type {string} */
          hour_ = "0" + hour_;
        }
        /** @type {number} */
        var min_ = minddate_.getMinutes();
        if (min_ < 10) {
          /** @type {string} */
          min_ = "0" + min_;
        }
        /** @type {number} */
        var sec_ = minddate_.getSeconds();
        if (sec_ < 10) {
          /** @type {string} */
          sec_ = "0" + sec_;
        }
        /** @type {string} */
        var retdate_ = getFormattedDate_(minddate_) + " " + hour_ + ":" + min_ + ":" + sec_;
        $("#raidrettimesela").val(3).change();
        $("#raidrettimeselinp").val(retdate_);
        jQuery("#doneOGAll")[0].click();
        alert("Defense set and troops returned");
      } else {
        alert("Defense set");
      }
    }
    $("#commandsPopUpBox").show();
    var commandtabs_ = $("#commandsdiv").tabs();
    commandtabs_.tabs("option", "active", 2);
    $("#reintabb").trigger({
      type : "click",
      originalEvent : "1"
    });
    var targets_ = defobj_.targets;
    var tarnumb_ = defobj_.targets.numb;
    var t_2 = defobj_.t;
    /** @type {number} */
    var maxdist_ = Math.max.apply(Math, targets_.dist);
    var time_;
    if (t_2.type.indexOf(14) > -1) {
      if (t_2.use[t_2.type.indexOf(14)] == 1) {
        /** @type {number} */
        time_ = ttspeed_[14] / ttspeedres_[14] * maxdist_;
        var gali_ = t_2.type.indexOf(14);
        if (defobj_.dep == 0) {
          /** @type {number} */
          var galnumb_ = Math.floor(t_2.home[gali_] / tarnumb_);
        } else {
          /** @type {number} */
          galnumb_ = Math.floor(t_2.tot[gali_] / tarnumb_);
        }
        /** @type {number} */
        var maxts_ = 0;
        var i_8;
        for (i_8 in t_2.home) {
          if (i_8 != gali_) {
            if (t_2.use[i_8] == 1) {
              if (t_2.type[i_8] != 15) {
                if (defobj_.dep == 0) {
                  /** @type {number} */
                  maxts_ = maxts_ + Math.floor(t_2.home[i_8] * ttts_[t_2.type[i_8]] / tarnumb_);
                } else {
                  /** @type {number} */
                  maxts_ = maxts_ + Math.floor(t_2.tot[i_8] * ttts_[t_2.type[i_8]] / tarnumb_);
                }
              }
            }
          }
        }
        if (maxts_ <= galnumb_ * 500) {
          /** @type {number} */
          t_2.amount[gali_] = Math.ceil(maxts_ / 500);
          for (i_8 in t_2.home) {
            if (i_8 != gali_) {
              if (t_2.use[i_8] == 1) {
                if (defobj_.dep == 0) {
                  /** @type {number} */
                  t_2.amount[i_8] = Math.floor(t_2.home[i_8] / tarnumb_);
                } else {
                  /** @type {number} */
                  t_2.amount[i_8] = Math.floor(t_2.tot[i_8] / tarnumb_);
                }
              }
            }
          }
        } else {
          /** @type {number} */
          var rat_ = galnumb_ * 500 / maxts_;
          /** @type {number} */
          t_2.amount[gali_] = galnumb_;
          for (i_8 in t_2.home) {
            if (i_8 != gali_) {
              if (t_2.use[i_8] == 1) {
                if (t_2.type[i_8] != 15) {
                  if (defobj_.dep == 0) {
                    /** @type {number} */
                    t_2.amount[i_8] = Math.floor(rat_ * t_2.home[i_8] / tarnumb_);
                  } else {
                    /** @type {number} */
                    t_2.amount[i_8] = Math.floor(rat_ * t_2.tot[i_8] / tarnumb_);
                  }
                } else {
                  if (defobj_.dep == 0) {
                    /** @type {number} */
                    t_2.amount[i_8] = Math.floor(t_2.home[i_8] / tarnumb_);
                  } else {
                    /** @type {number} */
                    t_2.amount[i_8] = Math.floor(t_2.tot[i_8] / tarnumb_);
                  }
                }
              }
            }
          }
        }
      }
    } else {
      /** @type {number} */
      time_ = Math.max.apply(Math, t_2.speed) * maxdist_;
      for (i_8 in t_2.home) {
        if (t_2.use[i_8] == 1) {
          if (defobj_.dep == 0) {
            /** @type {number} */
            t_2.amount[i_8] = Math.floor(t_2.home[i_8] / tarnumb_);
          } else {
            /** @type {number} */
            t_2.amount[i_8] = Math.floor(t_2.tot[i_8] / tarnumb_);
          }
        }
      }
    }
    /** @type {number} */
    var l_ = 0;
    var end_4 = targets_.x.length;
    dloop_();
  }
  /**
   * @return {undefined}
   */
  function updateattack_() {
    var t_3 = {
      home : [],
      type : []
    };
    var scouttts_;
    var i_11;
    for (i_11 in cdata_.tc) {
      if (cdata_.tc[i_11]) {
        if (i_11 == 7) {
          scouttts_ = cdata_.tc[7];
        } else {
          t_3.home.push(cdata_.tc[i_11]);
          t_3.type.push(i_11);
        }
      }
    }
    /** @type {string} */
    var ttseltab_ = "<table><thead><th>Troop Type</th><th>Use for real</th><th>Use for fake</th></thead><tbody>";
    for (i_11 in t_3.home) {
      /** @type {string} */
      ttseltab_ = ttseltab_ + ("<tr><td style='height:40px;'><div class='" + tpicdiv_[t_3.type[i_11]] + "'></div></td><td style='text-align: center;'><input id='usereal" + t_3.type[i_11] + "' class='clsubopti' type='checkbox' checked></td>");
      /** @type {string} */
      ttseltab_ = ttseltab_ + ("<td style='text-align: center;'><input id='usefake" + t_3.type[i_11] + "' class='clsubopti' type='checkbox' checked></td></tr>");
    }
    /** @type {string} */
    ttseltab_ = ttseltab_ + "</tbody></table>";
    $("#picktype").html(ttseltab_);
  }
  /**
   * @return {undefined}
   */
  function updatedef_() {
    var t_4 = {
      home : [],
      type : []
    };
    var i_12;
    for (i_12 in cdata_.tc) {
      if (cdata_.tc[i_12]) {
        t_4.home.push(cdata_.tc[i_12]);
        t_4.type.push(i_12);
      }
    }
    /** @type {string} */
    var ttseltab_1 = "<table><thead><th>Troop Type</th><th>Use</th></thead><tbody>";
    for (i_12 in t_4.home) {
      /** @type {string} */
      ttseltab_1 = ttseltab_1 + ("<tr><td style='height:40px;'><div class='" + tpicdiv_[t_4.type[i_12]] + "'></div></td><td style='text-align: center;'><input id='usedef" + t_4.type[i_12] + "' class='clsubopti' type='checkbox' checked></td></tr>");
    }
    /** @type {string} */
    ttseltab_1 = ttseltab_1 + "</tbody></table>";
    $("#dpicktype").html(ttseltab_1);
  }
  /**
   * @return {undefined}
   */
  function SendAttack_() {
    /**
     * @return {undefined}
     */
    function loop_() {
      if (targets_1.real[l_1] == 1) {
        if ($("#realtype").val() == 0) {
          pvptabs_.tabs("option", "active", 0);
          var i_14;
          for (i_14 in t_5.real) {
            $("#assIP" + t_5.type[i_14]).val(t_5.real[i_14]);
          }
          $("#assaultxcoord").val(targets_1.x[l_1]);
          $("#assaultycoord").val(targets_1.y[l_1]);
          setTimeout(function() {
            jQuery("#assaultcoordgo")[0].click();
          }, 100);
          $("#assaulttimingselect").val(3).change();
          var date_4 = $("#attackDat").val() + " " + $("#attackHr").val() + ":" + $("#attackMin").val() + ":" + $("#attackSec").val();
          $("#assaulttimeinp").val(date_4);
          alltimes_.a.push($("#assaulttraveltime").text());
          jQuery("#assaultGo")[0].click();
        }
        if ($("#realtype").val() == 1) {
          pvptabs_.tabs("option", "active", 1);
          for (i_14 in t_5.real) {
            $("#sieIP" + t_5.type[i_14]).val(t_5.real[i_14]);
          }
          $("#siexcoord").val(targets_1.x[l_1]);
          $("#sieycoord").val(targets_1.y[l_1]);
          setTimeout(function() {
            jQuery("#siegecoordgo")[0].click();
          }, 100);
          $("#siegetimingselect").val(3).change();
          date_4 = $("#attackDat").val() + " " + $("#attackHr").val() + ":" + $("#attackMin").val() + ":" + $("#attackSec").val();
          $("#siegetimeinp").val(date_4);
          alltimes_.a.push($("#siegetraveltime").text());
          jQuery("#siegeGo")[0].click();
        }
        if ($("#realtype").val() == 2) {
          pvptabs_.tabs("option", "active", 2);
          for (i_14 in t_5.real) {
            $("#pluIP" + t_5.type[i_14]).val(t_5.real[i_14]);
          }
          $("#pluxcoord").val(targets_1.x[l_1]);
          $("#pluycoord").val(targets_1.y[l_1]);
          setTimeout(function() {
            jQuery("#plundercoordgo")[0].click();
          }, 100);
          $("#plundertimingselect").val(3).change();
          date_4 = $("#attackDat").val() + " " + $("#attackHr").val() + ":" + $("#attackMin").val() + ":" + $("#attackSec").val();
          $("#plundtimeinp").val(date_4);
          alltimes_.a.push($("#plundtraveltime").text());
          $("#plunderGo").prop("disabled", false);
          jQuery("#plunderGo")[0].click();
        }
        if ($("#realtype").val() == 3) {
          pvptabs_.tabs("option", "active", 3);
          for (i_14 in t_5.real) {
            $("#scoIP" + t_5.type[i_14]).val(t_5.real[i_14]);
          }
          $("#scoIP7").val(t_5.scoutreal[0]);
          $("#scoxcoord").val(targets_1.x[l_1]);
          $("#scoycoord").val(targets_1.y[l_1]);
          setTimeout(function() {
            jQuery("#scoutcoordgo")[0].click();
          }, 100);
          $("#scouttimingselect").val(3).change();
          date_4 = $("#attackDat").val() + " " + $("#attackHr").val() + ":" + $("#attackMin").val() + ":" + $("#attackSec").val();
          $("#scouttimeinp").val(date_4);
          jQuery("#scoutGo")[0].click();
        }
      }
      if (targets_1.real[l_1] == 0) {
        if ($("#faketype").val() == 0) {
          pvptabs_.tabs("option", "active", 0);
          for (i_14 in t_5.real) {
            $("#assIP" + t_5.type[i_14]).val(t_5.fake[i_14]);
          }
          $("#assaultxcoord").val(targets_1.x[l_1]);
          $("#assaultycoord").val(targets_1.y[l_1]);
          setTimeout(function() {
            jQuery("#assaultcoordgo")[0].click();
          }, 100);
          $("#assaulttimingselect").val(3).change();
          date_4 = $("#attackDat").val() + " " + $("#attackHr").val() + ":" + $("#attackMin").val() + ":" + $("#attackSec").val();
          $("#assaulttimeinp").val(date_4);
          alltimes_.a.push($("#assaulttraveltime").text());
          jQuery("#assaultGo")[0].click();
        }
        if ($("#faketype").val() == 1) {
          pvptabs_.tabs("option", "active", 1);
          for (i_14 in t_5.real) {
            $("#sieIP" + t_5.type[i_14]).val(t_5.fake[i_14]);
          }
          $("#siexcoord").val(targets_1.x[l_1]);
          $("#sieycoord").val(targets_1.y[l_1]);
          setTimeout(function() {
            jQuery("#siegecoordgo")[0].click();
          }, 100);
          $("#siegetimingselect").val(3).change();
          date_4 = $("#attackDat").val() + " " + $("#attackHr").val() + ":" + $("#attackMin").val() + ":" + $("#attackSec").val();
          $("#siegetimeinp").val(date_4);
          alltimes_.a.push($("#siegetraveltime").text());
          jQuery("#siegeGo")[0].click();
        }
        if ($("#faketype").val() == 2) {
          pvptabs_.tabs("option", "active", 2);
          for (i_14 in t_5.real) {
            $("#pluIP" + t_5.type[i_14]).val(t_5.fake[i_14]);
          }
          $("#pluxcoord").val(targets_1.x[l_1]);
          $("#pluycoord").val(targets_1.y[l_1]);
          setTimeout(function() {
            jQuery("#plundercoordgo")[0].click();
          }, 100);
          $("#plundertimingselect").val(3).change();
          date_4 = $("#attackDat").val() + " " + $("#attackHr").val() + ":" + $("#attackMin").val() + ":" + $("#attackSec").val();
          $("#plundtimeinp").val(date_4);
          alltimes_.a.push($("#plundtraveltime").text());
          $("#plunderGo").prop("disabled", false);
          jQuery("#plunderGo")[0].click();
        }
        if ($("#faketype").val() == 3) {
          if ($("#scoutick").prop("checked") === true) {
            pvptabs_.tabs("option", "active", 3);
            $("#scoIP7").val(1);
            $("#scoIP14").val(30);
            $("#scoxcoord").val(targets_1.x[l_1]);
            $("#scoycoord").val(targets_1.y[l_1]);
            setTimeout(function() {
              jQuery("#scoutcoordgo")[0].click();
            }, 100);
            $("#scouttimingselect").val(3).change();
            date_4 = $("#attackDat").val() + " " + $("#attackHr").val() + ":" + $("#attackMin").val() + ":" + $("#attackSec").val();
            $("#scouttimeinp").val(date_4);
            jQuery("#scoutGo")[0].click();
          } else {
            pvptabs_.tabs("option", "active", 3);
            for (i_14 in t_5.real) {
              $("#scoIP" + t_5.type[i_14]).val(t_5.fake[i_14]);
            }
            $("#scoIP7").val(t_5.scoutfake[0]);
            $("#scoxcoord").val(targets_1.x[l_1]);
            $("#scoycoord").val(targets_1.y[l_1]);
            setTimeout(function() {
              jQuery("#scoutcoordgo")[0].click();
            }, 100);
            $("#scouttimingselect").val(3).change();
            date_4 = $("#attackDat").val() + " " + $("#attackHr").val() + ":" + $("#attackMin").val() + ":" + $("#attackSec").val();
            $("#scouttimeinp").val(date_4);
            jQuery("#scoutGo")[0].click();
          }
        }
      }
      l_1++;
      if (l_1 < end_5) {
        setTimeout(loop_, 1000);
      } else {
        setTimeout(function() {
          art_1();
        }, 4000);
      }
    }
    /**
     * @return {undefined}
     */
    function art_1() {
      $("#commandsPopUpBox").hide();
      if ($("#retcheck").prop("checked") == true) {
        jQuery(".toptdinncommtbl1:first")[0].click();
        setTimeout(function() {
          $("#outgoingPopUpBox").hide();
        }, 500);
        /** @type {!Date} */
        var minddate_1 = new Date;
        /** @type {boolean} */
        var first_4 = true;
        var i_15;
        for (i_15 in poll2_.OGA) {
          if (targets_1.cstr.indexOf(poll2_.OGA[i_15][5]) > -1) {
            if (first_4) {
              /** @type {boolean} */
              first_4 = false;
              var a_4 = poll2_.OGA[i_15][6].substr(30);
              var b_5 = a_4.substr(0, a_4.indexOf("<"));
              var time_3 = b_5.split(" ");
              var ttime_1 = time_3[2].split(":");
              minddate_1.setHours(Number(ttime_1[0]));
              minddate_1.setMinutes(Number(ttime_1[1]));
              minddate_1.setSeconds(Number(ttime_1[2]));
              if (time_3[1] == "Tomorrow") {
                minddate_1.setDate(minddate_1.getDate() + 1);
              } else {
                if (time_3[1] != "Today") {
                  var ddate_1 = time_3[1].split("/");
                  console.log(ddate_1);
                  minddate_1.setDate(Number(ddate_1[1]));
                  minddate_1.setMonth(Number(ddate_1[0] - 1));
                }
              }
            } else {
              a_4 = poll2_.OGA[i_15][6].substr(30);
              b_5 = a_4.substr(0, a_4.indexOf("<"));
              time_3 = b_5.split(" ");
              ttime_1 = time_3[2].split(":");
              /** @type {!Date} */
              var d_2 = new Date;
              d_2.setHours(ttime_1[0]);
              d_2.setMinutes(ttime_1[1]);
              d_2.setSeconds(ttime_1[2]);
              if (time_3[1] == "Tomorrow") {
                d_2.setDate(minddate_1.getDate() + 1);
              } else {
                if (time_3[1] != "Today") {
                  ddate_1 = time_3[1].split("/");
                  d_2.setDate(ddate_1[1]);
                  d_2.setMonth(ddate_1[0] - 1);
                }
              }
              if (d_2 < minddate_1) {
                /** @type {!Date} */
                minddate_1 = d_2;
              }
            }
          }
        }
        minddate_1.setHours(minddate_1.getHours() - Number($("#retHr").val()));
        /** @type {number} */
        var hour_1 = minddate_1.getHours();
        if (hour_1 < 10) {
          /** @type {string} */
          hour_1 = "0" + hour_1;
        }
        /** @type {number} */
        var min_1 = minddate_1.getMinutes();
        if (min_1 < 10) {
          /** @type {string} */
          min_1 = "0" + min_1;
        }
        /** @type {number} */
        var sec_1 = minddate_1.getSeconds();
        if (sec_1 < 10) {
          /** @type {string} */
          sec_1 = "0" + sec_1;
        }
        /** @type {string} */
        var retdate_1 = getFormattedDate_(minddate_1) + " " + hour_1 + ":" + min_1 + ":" + sec_1;
        $("#raidrettimesela").val(3).change();
        $("#raidrettimeselinp").val(retdate_1);
        jQuery("#doneOGAll")[0].click();
        alert("Attack set and troops returned");
      } else {
        alert("Attack set");
      }
    }
    $("#commandsPopUpBox").show();
    var commandtabs_1 = $("#commandsdiv").tabs();
    var pvptabs_ = $("#pvpTab").tabs();
    jQuery("#pvptabb")[0].click();
    commandtabs_1.tabs("option", "active", 1);
    var targets_1 = {
      x : [],
      y : [],
      real : [],
      dist : [],
      cstr : []
    };
    /** @type {number} */
    var fakenumb_ = 0;
    /** @type {number} */
    var realnumb_ = 0;
    var tempx_2;
    var tempy_2;
    /** @type {number} */
    var i_13 = 1;
    for (; i_13 < 16; i_13++) {
      if ($("#t" + i_13 + "x").val()) {
        tempx_2 = $("#t" + i_13 + "x").val();
        tempy_2 = $("#t" + i_13 + "y").val();
        targets_1.x.push(tempx_2);
        targets_1.y.push(tempy_2);
        targets_1.cstr.push(tempx_2 + ":" + tempy_2);
        targets_1.real.push($("#type" + i_13).val());
        if ($("#type" + i_13).val() == 1) {
          /** @type {number} */
          realnumb_ = realnumb_ + 1;
        } else {
          /** @type {number} */
          fakenumb_ = fakenumb_ + 1;
        }
        targets_1.dist.push(Math.sqrt((tempx_2 - city_.x) * (tempx_2 - city_.x) + (tempy_2 - city_.y) * (tempy_2 - city_.y)));
      }
    }
    var scouttts_1;
    var t_5 = {
      home : [],
      type : [],
      real : [],
      fake : [],
      speed : [],
      scoutfake : [],
      scoutreal : []
    };
    for (i_13 in cdata_.tc) {
      if (cdata_.tc[i_13]) {
        if (i_13 == 7) {
          scouttts_1 = cdata_.tc[7];
        } else {
          t_5.home.push(Math.ceil(cdata_.tc[i_13] * Number($("#perc").val()) / 100));
          t_5.type.push(Number(i_13));
          if ($("#usereal" + i_13).prop("checked") === true) {
            t_5.speed.push(ttspeed_[i_13] / ttspeedres_[i_13]);
          } else {
            t_5.speed.push(0);
          }
        }
      }
    }
    /** @type {number} */
    var maxdist_1 = Math.max.apply(Math, targets_1.dist);
    var time_2;
    var faketss_;
    var fakeg_;
    var tscbr_ = cdata_.tt;
    if (tscbr_ < 20000) {
      /** @type {number} */
      faketss_ = 1;
      /** @type {number} */
      fakeg_ = 1;
    } else {
      if (tscbr_ < 40000) {
        /** @type {number} */
        faketss_ = 200;
        /** @type {number} */
        fakeg_ = 1;
      } else {
        if (tscbr_ < 60000) {
          /** @type {number} */
          faketss_ = 500;
          /** @type {number} */
          fakeg_ = 1;
        } else {
          if (tscbr_ < 80000) {
            /** @type {number} */
            faketss_ = 800;
            /** @type {number} */
            fakeg_ = 2;
          } else {
            if (tscbr_ < 100000) {
              /** @type {number} */
              faketss_ = 1000;
              /** @type {number} */
              fakeg_ = 2;
            } else {
              if (tscbr_ < 120000) {
                /** @type {number} */
                faketss_ = 1200;
                /** @type {number} */
                fakeg_ = 2;
              } else {
                if (tscbr_ < 160000) {
                  /** @type {number} */
                  faketss_ = 1600;
                  /** @type {number} */
                  fakeg_ = 3;
                } else {
                  if (tscbr_ < 200000) {
                    /** @type {number} */
                    faketss_ = 2000;
                    /** @type {number} */
                    fakeg_ = 4;
                  } else {
                    if (tscbr_ < 240000) {
                      /** @type {number} */
                      faketss_ = 2500;
                      /** @type {number} */
                      fakeg_ = 5;
                    } else {
                      /** @type {number} */
                      faketss_ = 3000;
                      /** @type {number} */
                      fakeg_ = 5;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (scouttts_1 > 0) {
      if ($("#realtype").val() == 3 && $("#faketype").val() == 3) {
        if ($("#usereal14").prop("checked") === true) {
          if ($("#usefake14").prop("checked") === true) {
            /** @type {number} */
            t_5.scoutfake[0] = fakeg_ * 250;
            /** @type {number} */
            t_5.scoutreal[0] = Math.floor((scouttts_1 - fakeg_ * 250 * fakenumb_) / realnumb_);
          } else {
            /** @type {number} */
            t_5.scoutfake[0] = faketss_ / 2;
            /** @type {number} */
            t_5.scoutreal[0] = Math.floor((scouttts_1 - faketss_ / 2 * fakenumb_) / realnumb_);
          }
        } else {
          if ($("#usereal14").prop("checked") !== true) {
            if ($("#usefake14").prop("checked") === true) {
              /** @type {number} */
              t_5.scoutfake[0] = fakeg_ * 250;
              /** @type {number} */
              t_5.scoutreal[0] = Math.floor((scouttts_1 - fakeg_ * 250 * fakenumb_) / realnumb_);
            } else {
              /** @type {number} */
              t_5.scoutfake[0] = faketss_ / 2;
              /** @type {number} */
              t_5.scoutreal[0] = Math.floor((scouttts_1 - faketss_ / 2 * fakenumb_) / realnumb_);
            }
          }
        }
      }
      if ($("#realtype").val() == 3 && $("#faketype").val() != 3) {
        if ($("#usereal14").prop("checked") === true) {
          if ($("#usefake14").prop("checked") === true) {
            /** @type {number} */
            t_5.scoutreal[0] = Math.floor(scouttts_1 / realnumb_);
          } else {
            /** @type {number} */
            t_5.scoutreal[0] = Math.floor(scouttts_1 / realnumb_);
          }
        } else {
          /** @type {number} */
          t_5.scoutreal[0] = Math.floor(scouttts_1 / realnumb_);
        }
      }
      if ($("#realtype").val() != 3 && $("#faketype").val() == 3) {
        if ($("#usereal14").prop("checked") === true) {
          if ($("#usefake14").prop("checked") === true) {
            /** @type {number} */
            t_5.scoutfake[0] = fakeg_ * 250;
          } else {
            /** @type {number} */
            t_5.scoutfake[0] = faketss_ / 2;
          }
        } else {
          if ($("#usereal14").prop("checked") !== true) {
            if ($("#usefake14").prop("checked") === true) {
              /** @type {number} */
              t_5.scoutfak[0] = fakeg_ * 250;
            } else {
              /** @type {number} */
              t_5.scoutfake[0] = faketss_ / 2;
            }
          }
        }
      }
    }
    if (t_5.type.indexOf(14) > -1 && $("#usereal14").prop("checked") === true) {
      /** @type {number} */
      time_2 = ttspeed_[14] / ttspeedres_[14] * maxdist_1;
      /** @type {number} */
      var gali_1 = t_5.type.indexOf(14);
      /** @type {number} */
      var galnumb_1 = Math.floor((t_5.home[gali_1] - fakeg_ * fakenumb_) / realnumb_);
      /** @type {number} */
      t_5.real[gali_1] = galnumb_1;
      /** @type {number} */
      t_5.fake[gali_1] = fakeg_;
      /** @type {number} */
      var galcap_ = 500 * galnumb_1;
      /** @type {number} */
      var nongalts_ = 0;
      for (i_13 in t_5.home) {
        if (t_5.type[i_13] == 14 && t_5.type[i_13] == 17 && t_5.type[i_13] == 16) {
          if (t_5.type[i_13] == 14) {
            if ($("#usereal" + t_5.type[i_13]).prop("checked") === true) {
              if ($("#usefake" + t_5.type[i_13]).prop("checked") === true) {
                t_5.real[i_13] == 1;
                t_5.fake[i_13] == 1;
              } else {
                t_5.real[i_13] == 1;
                t_5.fake[i_13] == 0;
              }
            }
          }
          if (t_5.type[i_13] == 17) {
            if ($("#usereal" + t_5.type[i_13]).prop("checked") === true) {
              if ($("#usefake" + t_5.type[i_13]).prop("checked") === true) {
                if (t_5.home[i_13] >= fakenumb_ + realnumb_) {
                  /** @type {number} */
                  t_5.fake[i_13] = 1;
                  /** @type {number} */
                  t_5.real[i_13] = 1;
                } else {
                  /** @type {number} */
                  t_5.fake[i_13] = 0;
                  /** @type {number} */
                  t_5.real[i_13] = 1;
                }
              } else {
                /** @type {number} */
                t_5.fake[i_13] = 0;
                /** @type {number} */
                t_5.real[i_13] = 1;
              }
            } else {
              if ($("#usefake" + t_5.type[i_13]).prop("checked") === true) {
                /** @type {number} */
                t_5.real[i_13] = 0;
                /** @type {number} */
                t_5.fake[i_13] = 1;
              } else {
                /** @type {number} */
                t_5.real[i_13] = 0;
                /** @type {number} */
                t_5.fake[i_13] = 0;
              }
            }
          }
          if (t_5.type[i_13] == 16) {
            if ($("#usereal" + t_5.type[i_13]).prop("checked") === true) {
              if ($("#usefake" + t_5.type[i_13]).prop("checked") === true) {
                /** @type {number} */
                t_5.fake[i_13] = Math.ceil(faketss_ * t_5.home[i_13]);
                /** @type {number} */
                t_5.real[i_13] = Math.floor((t_5.home[i_13] - t_5.fake[i_13] * fakenumb_) / realnumb_);
              } else {
                /** @type {number} */
                t_5.real[i_13] = Math.floor(t_5.home[i_13] / realnumb_);
              }
            }
          }
        }
      }
      for (i_13 in t_5.home) {
        if (i_13 != gali_1 && t_5.type[i_13] != 17) {
          if ($("#usereal" + t_5.type[i_13]).prop("checked") === true) {
            if ($("#usefake" + t_5.type[i_13]).prop("checked") === true) {
              /** @type {number} */
              nongalts_ = nongalts_ + ttts_[t_5.type[i_13]] * (t_5.home[i_13] - Math.ceil(fakeg_ * 500 / ttts_[t_5.type[i_13]]) * fakenumb_) / realnumb_;
            } else {
              /** @type {number} */
              nongalts_ = nongalts_ + ttts_[t_5.type[i_13]] * t_5.home[i_13] / realnumb_;
            }
          }
        }
        if (t_5.type[i_13] == 17) {
          if ($("#usereal" + t_5.type[i_13]).prop("checked") === true) {
            if ($("#usefake" + t_5.type[i_13]).prop("checked") === true) {
              if (t_5.home[i_13] >= fakenumb_ + realnumb_) {
                /** @type {number} */
                nongalts_ = nongalts_ + 1;
              } else {
                /** @type {number} */
                nongalts_ = nongalts_ + 1;
              }
            } else {
              /** @type {number} */
              nongalts_ = nongalts_ + 1;
            }
          }
        }
      }
      /** @type {number} */
      var fakerat_ = 0;
      for (i_13 in t_5.home) {
        if (i_13 != gali_1) {
          if ($("#usefake" + t_5.type[i_13]).prop("checked") === true) {
            /** @type {number} */
            fakerat_ = fakerat_ + ttts_[t_5.type[i_13]] * t_5.home[i_13];
          }
        }
      }
      for (i_13 in t_5.home) {
        if (i_13 != gali_1 && t_5.type[i_13] != 17) {
          if ($("#usefake" + t_5.type[i_13]).prop("checked") === true) {
            /** @type {number} */
            t_5.fake[i_13] = Math.ceil(fakeg_ * 500 * t_5.home[i_13] / fakerat_);
          }
        }
        if (t_5.type[i_13] == 17) {
          if ($("#usereal" + t_5.type[i_13]).prop("checked") === true) {
            if ($("#usefake" + t_5.type[i_13]).prop("checked") === true) {
              if (t_5.home[i_13] >= fakenumb_ + realnumb_) {
                /** @type {number} */
                t_5.fake[i_13] = 1;
                /** @type {number} */
                t_5.real[i_13] = 1;
              } else {
                /** @type {number} */
                t_5.fake[i_13] = 0;
                /** @type {number} */
                t_5.real[i_13] = 1;
              }
            } else {
              /** @type {number} */
              t_5.fake[i_13] = 0;
              /** @type {number} */
              t_5.real[i_13] = 1;
            }
          } else {
            if ($("#usefake" + t_5.type[i_13]).prop("checked") === true) {
              /** @type {number} */
              t_5.real[i_13] = 0;
              /** @type {number} */
              t_5.fake[i_13] = 1;
            } else {
              /** @type {number} */
              t_5.real[i_13] = 0;
              /** @type {number} */
              t_5.fake[i_13] = 0;
            }
          }
        }
      }
      for (i_13 in t_5.home) {
        if (i_13 != gali_1 && t_5.type[i_13] != 17) {
          if ($("#usereal" + t_5.type[i_13]).prop("checked") === true) {
            if ($("#usefake" + t_5.type[i_13]).prop("checked") === true) {
              if (nongalts_ > galcap_) {
                /** @type {number} */
                t_5.real[i_13] = Math.floor(galcap_ / nongalts_ * (t_5.home[i_13] - t_5.fake[i_13] * fakenumb_) / realnumb_);
              } else {
                /** @type {number} */
                t_5.real[i_13] = Math.floor((t_5.home[i_13] - t_5.fake[i_13] * fakenumb_) / realnumb_);
              }
            } else {
              if (nongalts_ > galcap_) {
                /** @type {number} */
                t_5.real[i_13] = Math.floor(galcap_ / nongalts_ * t_5.home[i_13] / realnumb_);
              } else {
                /** @type {number} */
                t_5.real[i_13] = Math.floor(t_5.home[i_13] / realnumb_);
              }
              /** @type {number} */
              t_5.fake[i_13] = 0;
            }
          }
        }
      }
    } else {
      /** @type {number} */
      fakerat_ = 0;
      /** @type {number} */
      time_2 = Math.max.apply(Math, t_5.speed) * maxdist_1;
      for (i_13 in t_5.home) {
        if (t_5.type[i_13] !== 17) {
          if ($("#usefake" + t_5.type[i_13]).prop("checked") === true) {
            /** @type {number} */
            fakerat_ = fakerat_ + ttts_[t_5.type[i_13]] * t_5.home[i_13];
          }
        }
      }
      for (i_13 in t_5.home) {
        if (t_5.type[i_13] != 17) {
          if ($("#usefake" + t_5.type[i_13]).prop("checked") === true) {
            /** @type {number} */
            t_5.fake[i_13] = Math.ceil(faketss_ * t_5.home[i_13] / fakerat_);
          }
        }
      }
      for (i_13 in t_5.home) {
        if (t_5.type[i_13] != 17) {
          if ($("#usereal" + t_5.type[i_13]).prop("checked") === true) {
            if ($("#usefake" + t_5.type[i_13]).prop("checked") === true) {
              /** @type {number} */
              t_5.real[i_13] = Math.floor((t_5.home[i_13] - t_5.fake[i_13] * fakenumb_) / realnumb_);
            } else {
              /** @type {number} */
              t_5.real[i_13] = Math.floor(t_5.home[i_13] / realnumb_);
            }
          } else {
            /** @type {number} */
            t_5.real[i_13] = 0;
          }
        }
        if (t_5.type[i_13] == 17) {
          if ($("#usereal" + t_5.type[i_13]).prop("checked") === true) {
            if ($("#usefake" + t_5.type[i_13]).prop("checked") === true) {
              if (t_5.home[i_13] >= fakenumb_ + realnumb_) {
                /** @type {number} */
                t_5.fake[i_13] = 1;
                /** @type {number} */
                t_5.real[i_13] = 1;
              } else {
                /** @type {number} */
                t_5.fake[i_13] = 0;
                /** @type {number} */
                t_5.real[i_13] = 1;
              }
            } else {
              /** @type {number} */
              t_5.fake[i_13] = 0;
              /** @type {number} */
              t_5.real[i_13] = 1;
            }
          } else {
            if ($("#usefake" + t_5.type[i_13]).prop("checked") === true) {
              /** @type {number} */
              t_5.real[i_13] = 0;
              /** @type {number} */
              t_5.fake[i_13] = 1;
            } else {
              /** @type {number} */
              t_5.real[i_13] = 0;
              /** @type {number} */
              t_5.fake[i_13] = 0;
            }
          }
        }
      }
    }
    var alltimes_ = {
      a : [],
      b : [],
      c : [],
      d : []
    };
    /** @type {number} */
    var l_1 = 0;
    /** @type {number} */
    var end_5 = targets_1.x.length;
    loop_();
  }
  /**
   * @return {?}
   */
  function coonvalue_() {
    if (coofz_ == 1) {
      /** @type {number} */
      coon_ = 0;
      $("#fb1").removeClass("redb").addClass("greenb");
    }
    if (coofz_ == 0) {
      /** @type {number} */
      coon_ = 1;
      $("#fb1").removeClass("greenb").addClass("redb");
    }
    return coon_;
  }
  /**
   * @return {undefined}
   */
  function makebuildcount_() {
    $("#bdtable").remove();
    var currentbd_ = {
      name : [],
      bid : [],
      count : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
    var j_4;
    /** @type {number} */
    var bdtypecount_ = -1;
    /** @type {number} */
    var bdNumber_ = -1;
    var i_16;
    for (i_16 in buildingdata_) {
      if (buildings_.bid.indexOf(buildingdata_[i_16].bid) > -1) {
        if (currentbd_.bid.indexOf(buildingdata_[i_16].bid) > -1) {
          /** @type {number} */
          j_4 = currentbd_.bid.indexOf(buildingdata_[i_16].bid);
          currentbd_.count[j_4] += 1;
          /** @type {number} */
          bdNumber_ = bdNumber_ + 1;
        } else {
          /** @type {number} */
          bdtypecount_ = bdtypecount_ + 1;
          /** @type {number} */
          j_4 = buildings_.bid.indexOf(buildingdata_[i_16].bid);
          currentbd_.name[bdtypecount_] = buildings_.name[j_4];
          currentbd_.bid[bdtypecount_] = buildings_.bid[j_4];
          currentbd_.count[bdtypecount_] += 1;
          /** @type {number} */
          bdNumber_ = bdNumber_ + 1;
        }
      }
    }
    /** @type {string} */
    var bdtable_ = "<table id='bdtable'><tbody><tr>";
    for (i_16 in currentbd_.bid) {
      if (i_16 < 9 || i_16 > 9 && i_16 < 19 || i_16 > 19 && i_16 < 29) {
        /** @type {string} */
        bdtable_ = bdtable_ + ("<td style='text-align:center; width:30px; height:30px;'><div style='background-image: url(/images/city/buildings/icons/" + currentbd_.name[i_16] + ".png); background-size:contain;background-repeat:no-repeat;width:30px; height:30px;'></div>" + Number(currentbd_.count[i_16]) + "</td>");
      }
      if (i_16 == 9 || i_16 == 19) {
        /** @type {string} */
        bdtable_ = bdtable_ + "</tr><tr>";
        /** @type {string} */
        bdtable_ = bdtable_ + ("<td style='text-align:center; width:30px; height:30px;'><div style='background-image: url(/images/city/buildings/icons/" + currentbd_.name[i_16] + ".png); background-size:contain;background-repeat:no-repeat;width:30px; height:30px;'></div>" + Number(currentbd_.count[i_16]) + "</td>");
      }
    }
    /** @type {string} */
    bdtable_ = bdtable_ + "</tr></tbody></table>";
    $("#bdcountwin").html(bdtable_);
    $("#numbdleft").html(bdNumber_);
  }
  /**
   * @param {number} num_6
   * @return {?}
   */
  function roundingto2_(num_6) {
    return +(Math.round(num_6 + "e+2") + "e-2");
  }
  /**
   * @param {number} n_3
   * @return {?}
   */
  function twodigitnum_(n_3) {
    return n_3 > 9 ? "" + n_3 : "0" + n_3;
  }
  /**
   * @return {undefined}
   */
  function incomings_() {
    /** @type {!Array} */
    var speeeed_ = [];
    /** @type {number} */
    speeeed_[0] = 0;
    /** @type {number} */
    var i_17 = 1;
    for (; i_17 < 201; i_17++) {
      speeeed_[i_17] = speeeed_[i_17 - 1] + 0.5;
    }
    /** @type {!Array} */
    var navyspeed_ = [];
    /** @type {!Array} */
    var scoutspeed_ = [];
    /** @type {!Array} */
    var cavspeed_ = [];
    /** @type {!Array} */
    var infspeed_ = [];
    /** @type {!Array} */
    var artspeed_ = [];
    /** @type {!Array} */
    var senspeed_ = [];
    var temp_1;
    for (i_17 in speeeed_) {
      /** @type {number} */
      temp_1 = 5 / (1 + speeeed_[i_17] * 1.0 / 100);
      navyspeed_[i_17] = roundingto2_(temp_1);
      /** @type {number} */
      temp_1 = 8 / (1 + speeeed_[i_17] * 1.0 / 100);
      scoutspeed_[i_17] = roundingto2_(temp_1);
      /** @type {number} */
      temp_1 = 10 / (1 + speeeed_[i_17] * 1.0 / 100);
      cavspeed_[i_17] = roundingto2_(temp_1);
      /** @type {number} */
      temp_1 = 20 / (1 + speeeed_[i_17] * 1.0 / 100);
      infspeed_[i_17] = roundingto2_(temp_1);
      /** @type {number} */
      temp_1 = 30 / (1 + speeeed_[i_17] * 1.0 / 100);
      artspeed_[i_17] = roundingto2_(temp_1);
      /** @type {number} */
      temp_1 = 40 / (1 + speeeed_[i_17] * 1.0 / 100);
      senspeed_[i_17] = roundingto2_(temp_1);
    }
    $("#iaBody tr").each(function() {
      var tid_2 = $(":nth-child(5)", this).children().children().attr("data");
      var sid_ = $(":nth-child(10)", this).children().attr("data");
      /** @type {number} */
      var tx_ = tid_2 % 65536;
      /** @type {number} */
      var sx_1 = sid_ % 65536;
      /** @type {number} */
      var ty_ = (tid_2 - tx_) / 65536;
      /** @type {number} */
      var sy_1 = (sid_ - sx_1) / 65536;
      /** @type {number} */
      var tcont_2 = Math.floor(tx_ / 100) + Math.floor(ty_ / 100) * 10;
      /** @type {number} */
      var scont_ = Math.floor(sx_1 / 100) + Math.floor(sy_1 / 100) * 10;
      /** @type {number} */
      var dist_ = Math.sqrt((ty_ - sy_1) * (ty_ - sy_1) + (tx_ - sx_1) * (tx_ - sx_1));
      var atime_ = $(":nth-child(6)", this).text();
      var stime_ = $(":nth-child(11)", this).text();
      /** @type {number} */
      var hdiff_ = atime_.substring(0, 2) - stime_.substring(0, 2);
      /** @type {number} */
      var mdiff_ = atime_.substring(3, 5) - stime_.substring(3, 5);
      /** @type {number} */
      var sdiff_ = atime_.substring(6, 8) - stime_.substring(6, 8);
      /** @type {!Date} */
      var d_3 = new Date;
      /** @type {!Date} */
      var x_74 = new Date;
      var arrivaltimemonth_;
      var arrivaltimedate_;
      if (atime_.length === 14) {
        /** @type {number} */
        arrivaltimemonth_ = Number(atime_.substring(9, 11));
        /** @type {number} */
        arrivaltimedate_ = Number(atime_.substring(12, 14));
      } else {
        /** @type {number} */
        arrivaltimemonth_ = d_3.getMonth() + 1;
        /** @type {number} */
        arrivaltimedate_ = d_3.getDate();
      }
      var time_4;
      if (hdiff_ >= 0) {
        /** @type {number} */
        time_4 = 60 * hdiff_;
      } else {
        /** @type {number} */
        time_4 = (24 + hdiff_) * 60;
      }
      if ((atime_.length === 14 || stime_.length === 14) && hdiff_ > 0) {
        /** @type {number} */
        time_4 = time_4 + +1440;
        /** @type {number} */
        hdiff_ = hdiff_ + 24;
      }
      /** @type {number} */
      time_4 = time_4 + mdiff_;
      /** @type {number} */
      time_4 = time_4 + sdiff_ / 60;
      var ispeed_ = roundingto2_(time_4 / dist_);
      var nspeed_ = roundingto2_((time_4 - 60) / dist_);
      var locks_;
      var lockm_;
      var lockh_;
      if (sdiff_ >= 0) {
        /** @type {number} */
        locks_ = sdiff_;
      } else {
        /** @type {number} */
        locks_ = 60 + sdiff_;
        /** @type {number} */
        mdiff_ = mdiff_ - 1;
      }
      if (mdiff_ >= 0) {
        /** @type {number} */
        lockm_ = mdiff_;
      } else {
        /** @type {number} */
        lockm_ = 60 + mdiff_;
        /** @type {number} */
        hdiff_ = hdiff_ - 1;
      }
      if (hdiff_ >= 0) {
        /** @type {number} */
        lockh_ = hdiff_;
      } else {
        /** @type {number} */
        lockh_ = hdiff_ + 24;
      }
      var travelingts_ = twodigitnum_(locks_);
      var travelingtm_ = twodigitnum_(lockm_);
      var travelingth_ = twodigitnum_(lockh_);
      /** @type {number} */
      var locktimeh_ = Number(lockh_) + Number(atime_.substring(0, 2));
      /** @type {number} */
      var locktimem_ = Number(lockm_) + Number(atime_.substring(3, 5));
      /** @type {number} */
      var locktimes_ = Number(locks_) + Number(atime_.substring(6, 8));
      if (locktimes_ > 59) {
        /** @type {number} */
        locktimes_ = locktimes_ - 60;
        /** @type {number} */
        locktimem_ = locktimem_ + 1;
      }
      if (locktimem_ > 59) {
        /** @type {number} */
        locktimem_ = locktimem_ - 60;
        /** @type {number} */
        locktimeh_ = locktimeh_ + 1;
      }
      if (locktimeh_ > 23) {
        /** @type {number} */
        locktimeh_ = locktimeh_ - 24;
        /** @type {number} */
        arrivaltimedate_ = arrivaltimedate_ + 1;
      }
      /** @type {!Array} */
      var atm1_ = [1, 3, 5, 7, 8, 10, 12];
      /** @type {!Array} */
      var atm2_ = [4, 6, 9, 11];
      if (atm1_.indexOf(arrivaltimemonth_) > 0) {
        if (arrivaltimedate_ > 31) {
          /** @type {number} */
          arrivaltimedate_ = 1;
        }
      }
      if (atm2_.indexOf(arrivaltimemonth_) > 0) {
        if (arrivaltimedate_ > 30) {
          /** @type {number} */
          arrivaltimedate_ = 1;
        }
      }
      if (arrivaltimemonth_ === 2) {
        if (arrivaltimedate_ > 28) {
          /** @type {number} */
          arrivaltimedate_ = 1;
        }
      }
      var addt_ = $(this);
      locktimeh_ = twodigitnum_(locktimeh_);
      locktimem_ = twodigitnum_(locktimem_);
      locktimes_ = twodigitnum_(locktimes_);
      arrivaltimemonth_ = twodigitnum_(arrivaltimemonth_);
      arrivaltimedate_ = twodigitnum_(arrivaltimedate_);
      /** @type {string} */
      var newtd_ = "<td></td>";
      if (addt_.children().length === 14) {
        $(this).append(newtd_);
        $(":nth-child(15)", this).text(locktimeh_ + ":" + locktimem_ + ":" + locktimes_ + " " + arrivaltimemonth_ + "/" + arrivaltimedate_);
        if ($(":nth-child(2)", this).text() == "Sieging") {
          $(":nth-child(15)", this).css("color", "red");
        }
      }
      if (addt_.children().length === 15) {
        $(this).append(newtd_);
        $(":nth-child(16)", this).text(travelingth_ + ":" + travelingtm_ + ":" + travelingts_);
        if ($(":nth-child(2)", this).text() == "Sieging") {
          $(":nth-child(16)", this).css("color", "red");
        }
      }
      if ($(":nth-child(2)", this).text() == "-") {
        /** @type {number} */
        var zns_ = navyspeed_.indexOf(nspeed_);
        /** @type {number} */
        var zss_ = scoutspeed_.indexOf(ispeed_);
        /** @type {number} */
        var zcs_ = cavspeed_.indexOf(ispeed_);
        /** @type {number} */
        var zis_ = infspeed_.indexOf(ispeed_);
        /** @type {number} */
        var zas_ = artspeed_.indexOf(ispeed_);
        /** @type {number} */
        var zsn_ = senspeed_.indexOf(ispeed_);
        if (tcont_2 == scont_) {
          if (ispeed_ > 30) {
            if (zsn_ == -1) {
              $(":nth-child(2)", this).text("Tower?/Sen");
            } else {
              $(":nth-child(2)", this).text("senator " + speeeed_[zsn_] + "%");
            }
          }
          if (ispeed_ > 20 && ispeed_ <= 30) {
            if (zsn_ == -1 && zas_ == -1) {
              $(":nth-child(2)", this).text("Tower?/Art/Sen");
            }
            if (zsn_ == -1 && zas_ != -1) {
              $(":nth-child(2)", this).text("Artillery " + speeeed_[zas_] + "%");
            }
            if (zsn_ != -1 && zas_ == -1) {
              $(":nth-child(2)", this).text("Senator " + speeeed_[zsn_] + "%");
            }
            if (zsn_ != -1 && zas_ != -1) {
              $(":nth-child(2)", this).text("Art " + speeeed_[zas_] + "%" + "/" + "Sen " + speeeed_[zsn_] + "%");
            }
          }
          if (ispeed_ == 20) {
            $(":nth-child(2)", this).text("Inf 0%/Art 50%/Sen 100%");
          }
          if (ispeed_ >= 15 && ispeed_ < 20) {
            if (zis_ == -1 && zas_ == -1) {
              $(":nth-child(2)", this).text("Tower?/Inf &above");
            }
            if (zis_ == -1 && zas_ != -1) {
              $(":nth-child(2)", this).text("Artillery " + speeeed_[zas_] + "%");
            }
            if (zis_ != -1 && zas_ == -1) {
              $(":nth-child(2)", this).text("Infantry " + speeeed_[zis_] + "%");
            }
            if (zis_ != -1 && zas_ != -1) {
              $(":nth-child(2)", this).text("Inf " + speeeed_[zis_] + "%" + "/" + "Art " + speeeed_[zas_] + "%");
            }
          }
          if (ispeed_ >= 10 && ispeed_ < 15) {
            if (zis_ == -1 && zcs_ == -1) {
              $(":nth-child(2)", this).text("Tower?/Cav &above");
            }
            if (zis_ == -1 && zcs_ != -1) {
              $(":nth-child(2)", this).text("Cav " + speeeed_[zcs_] + "%");
            }
            if (zis_ != -1 && zcs_ == -1) {
              $(":nth-child(2)", this).text("Inf " + speeeed_[zis_] + "%");
            }
            if (zis_ != -1 && zcs_ != -1) {
              $(":nth-child(2)", this).text("Cav " + speeeed_[zcs_] + "%" + "/" + "Inf " + speeeed_[zis_] + "%");
            }
          }
          if (ispeed_ > 8 && ispeed_ < 10) {
            if (zcs_ == -1) {
              $(":nth-child(2)", this).text("Tower?/Cav &above");
            } else {
              $(":nth-child(2)", this).text("Cav " + speeeed_[zcs_] + "%");
            }
          }
          if (ispeed_ > 5 && ispeed_ <= 8) {
            if (zss_ == -1 && zcs_ == -1) {
              $(":nth-child(2)", this).text("Tower?/Scout &above");
            }
            if (zss_ == -1 && zcs_ != -1) {
              $(":nth-child(2)", this).text("Cav " + speeeed_[zcs_] + "%");
            }
            if (zss_ != -1 && zcs_ == -1) {
              $(":nth-child(2)", this).text("Scout " + speeeed_[zss_] + "%");
            }
            if (zss_ != -1 && zcs_ != -1) {
              $(":nth-child(2)", this).text("Scout " + speeeed_[zss_] + "%" + "/" + "Cav " + speeeed_[zcs_] + "%");
            }
          }
          if (ispeed_ == 5) {
            $(":nth-child(2)", this).text("Navy 0%/Scout 60%/Cav 100%");
          }
          if (ispeed_ >= 4 && ispeed_ < 5) {
            if (zss_ == -1 && zns_ == -1) {
              $(":nth-child(2)", this).text("Tower?/scout &above");
            }
            if (zss_ == -1 && zns_ != -1) {
              $(":nth-child(2)", this).text("Navy " + speeeed_[zns_] + "%");
            }
            if (zss_ != -1 && zns_ == -1) {
              $(":nth-child(2)", this).text("Scout " + speeeed_[zss_] + "%");
            }
            if (zss_ != -1 && zns_ != -1) {
              $(":nth-child(2)", this).text("Navy " + speeeed_[zns_] + "%" + "/" + "Scout " + speeeed_[zss_] + "%");
            }
          }
          if (ispeed_ < 4) {
            if (zns_ == -1) {
              $(":nth-child(2)", this).text("Tower?/Navy &above");
            } else {
              $(":nth-child(2)", this).text("Navy " + speeeed_[zns_] + "%");
            }
          }
        } else {
          if ($(":nth-child(1)", this).html()) {
            $(":nth-child(2)", this).text("Portal");
          } else {
            if (zns_ != -1) {
              $(":nth-child(2)", this).text("Navy " + speeeed_[zns_] + "%");
            } else {
              $(":nth-child(2)", this).text("Tower?/Navy");
            }
          }
        }
      }
    });
  }
  /**
   * @param {!Object} data_33
   * @return {undefined}
   */
  function openreturnwin_(data_33) {
    $(".toptdinncommtbl1:first").click();
    setTimeout(function() {
      $("#outgoingPopUpBox").hide();
    }, 300);
    var selectcont_ = $("#idleCsel").clone(false).attr({
      id : "selcr",
      style : "width:40%;height:28px;font-size:11;border-radius:6px;margin:7px"
    });
    /** @type {string} */
    var returnwin_ = "<div id='returnAll' style='width:300px;height:320px;background-color: #E2CBAC;-moz-border-radius: 10px;-webkit-border-radius: 10px;border-radius: 10px;border: 4px ridge #DAA520;position:absolute;right:100px;top:100px; z-index:1000000;'><div class=\"popUpBar\"> <span class=\"ppspan\">Return all troops in all cities</span>";
    /** @type {string} */
    returnwin_ = returnwin_ + '<button id="cfunkyX" onclick="$(\'#returnAll\').remove();" class="xbutton greenb"><div id="xbuttondiv"><div><div id="centxbuttondiv"></div></div></div></button></div><div id=\'returnbody\' class="popUpWindow">';
    /** @type {string} */
    returnwin_ = returnwin_ + "</div></div>";
    /** @type {string} */
    var selecttype_ = "<select id='selType' class='greensel' style='width:50%;height:28px;font-size:11;border-radius:6px;margin:7px'><option value='1'>Offence and Defense</option><option value='2'>Offence</option><option value='3'>Defense</option></select><br>";
    var selectret_ = $("#raidrettimesela").clone(false).attr({
      id : "returnSel",
      style : "width:40%;height:28px;font-size:11;border-radius:6px;margin:7px"
    });
    /** @type {string} */
    var selecttime_ = "<br><div id='timeblock' style='height:100px; width 95%'><div id='timesel' style='display: none;'><span style='text-align:left;font-weight:800;margin-left:2%;'>Input latest return time:</span><br><table style='width:80%;margin-left:10px'><thead><tr style='text-align:center;'><td>Hr</td><td>Min</td><td>Sec</td><td colspan='2'>Date</td></tr></thead><tbody>";
    /** @type {string} */
    selecttime_ = selecttime_ + "<tr><td><input id='returnHr' type='number' style='width: 35px;height: 22px;font-size: 10px;padding: none !important;color: #000;' value='00'></td><td><input id='returnMin' style='width: 35px;height: 22px;font-size: 10px;padding: none !important;color: #000;' type='number' value='00'></td>";
    /** @type {string} */
    selecttime_ = selecttime_ + "<td><input style='width: 35px;height: 22px;font-size: 10px;padding: none !important;color: #000;' id='returnSec' type='number' value='00'></td><td colspan='2'><input style='width:90px;' id='returnDat' type='text' value='00/00/0000'></td></tr></tbody></table></div></div>";
    /** @type {string} */
    var returnAllgo_ = "<button id='returnAllGo' style='margin-left:30%; width: 35%;height: 30px !important; font-size: 12px !important; position: static !important;' class='regButton greenb'>Start Return All</button><br>";
    /** @type {string} */
    var nextcity_ = "<button id='nextCity' style='display: none;margin-left:10%; width: 35%;height: 30px !important; font-size: 12px !important; position: static !important;' class='regButton greenb'>Next City</button>";
    /** @type {string} */
    var returntroops_ = "<button id='returnTroops' style='display: none;margin-left:10%; width: 35%;height: 30px !important; font-size: 12px !important; position: static !important;' class='regButton greenb'>Return troops</button>";
    var selectlist_ = $("#organiser").clone(false).attr({
      id : "selClist",
      style : "width:40%;height:28px;font-size:11;border-radius:6px;margin:7px"
    });
    $("body").append(returnwin_);
    $("#returnAll").draggable({
      handle : ".popUpBar",
      containment : "window",
      scroll : false
    });
    $("#returnbody").html(selectcont_);
    $("#selcr").after(selecttype_);
    $("#selType").after(selectret_);
    $("#returnSel").after(selectlist_);
    $("#selClist").after(selecttime_);
    $(function() {
      $("#returnDat").datepicker();
    });
    $("#returnbody").append(returnAllgo_);
    $("#returnAllGo").after(nextcity_);
    $("#nextCity").after(returntroops_);
    $("#returnSel").change(function() {
      if ($("#returnSel").val() == 3) {
        $("#timesel").show();
      } else {
        $("#timesel").hide();
      }
    });
    var j_5;
    var end_6;
    var bb_;
    var cc_;
    var aa_;
    var returncities_ = {
      cid : [],
      cont : []
    };
    $("#returnAllGo").click(function() {
      if ($("#selClist").val() == "all") {
        var i_18;
        for (i_18 in data_33) {
          var cont_1 = data_33[i_18].c.co;
          if ($("#selcr").val() == 56) {
            if ($("#selType").val() == 1) {
              returncities_.cid.push(data_33[i_18].i);
              returncities_.cont.push(cont_1);
            }
            if ($("#selType").val() == 2) {
              if (data_33[i_18].tr.indexOf(5) > -1 || data_33[i_18].tr.indexOf(6) > -1 || data_33[i_18].tr.indexOf(10) > -1 || data_33[i_18].tr.indexOf(11) > -1 || data_33[i_18].tr.indexOf(12) > -1 || data_33[i_18].tr.indexOf(13) > -1 || data_33[i_18].tr.indexOf(14) > -1 || data_33[i_18].tr.indexOf(16) > -1) {
                returncities_.cid.push(data_33[i_18].i);
                returncities_.cont.push(cont_1);
              }
            }
            if ($("#selType").val() == 3) {
              if (data_33[i_18].tr.indexOf(1) > -1 || data_33[i_18].tr.indexOf(2) > -1 || data_33[i_18].tr.indexOf(3) > -1 || data_33[i_18].tr.indexOf(4) > -1 || data_33[i_18].tr.indexOf(8) > -1 || data_33[i_18].tr.indexOf(9) > -1 || data_33[i_18].tr.indexOf(15) > -1) {
                returncities_.cid.push(data_33[i_18].i);
                returncities_.cont.push(cont_1);
              }
            }
          }
          if (cont_1 == Number($("#selcr").val())) {
            if ($("#selType").val() == 1) {
              returncities_.cid.push(data_33[i_18].i);
              returncities_.cont.push(cont_1);
            }
            if ($("#selType").val() == 2) {
              if (data_33[i_18].tr.indexOf(5) > -1 || data_33[i_18].tr.indexOf(6) > -1 || data_33[i_18].tr.indexOf(10) > -1 || data_33[i_18].tr.indexOf(11) > -1 || data_33[i_18].tr.indexOf(12) > -1 || data_33[i_18].tr.indexOf(13) > -1 || data_33[i_18].tr.indexOf(14) > -1 || data_33[i_18].tr.indexOf(16) > -1) {
                returncities_.cid.push(data_33[i_18].i);
                returncities_.cont.push(cont_1);
              }
            }
            if ($("#selType").val() == 3) {
              if (data_33[i_18].tr.indexOf(1) > -1 || data_33[i_18].tr.indexOf(2) > -1 || data_33[i_18].tr.indexOf(3) > -1 || data_33[i_18].tr.indexOf(4) > -1 || data_33[i_18].tr.indexOf(8) > -1 || data_33[i_18].tr.indexOf(9) > -1 || data_33[i_18].tr.indexOf(15) > -1) {
                returncities_.cid.push(data_33[i_18].i);
                returncities_.cont.push(cont_1);
              }
            }
          }
        }
      } else {
        $.each(clc_, function(key_36, value_84) {
          if (key_36 == $("#selClist").val()) {
            /** @type {number} */
            returncities_.cid = value_84;
          }
        });
      }
      $("#organiser").val("all").change();
      bb_ = $("#returnSel").val();
      if (bb_ == 3) {
        cc_ = $("#returnDat").val() + " " + $("#returnHr").val() + ":" + $("#returnMin").val() + ":" + $("#returnSec").val();
      } else {
        /** @type {number} */
        cc_ = 0;
      }
      /** @type {number} */
      j_5 = 0;
      /** @type {number} */
      end_6 = returncities_.cid.length;
      aa_ = returncities_.cid[j_5];
      $("#cityDropdownMenu").val(aa_).change();
      $("#returnTroops").show();
      $("#nextCity").show();
      $("#returnAllGo").hide();
    });
    $("#returnTroops").click(function() {
      $("#raidrettimesela").val(bb_).change();
      $("#raidrettimeselinp").val(cc_);
      jQuery("#doneOGAll")[0].click();
    });
    $("#nextCity").click(function() {
      j_5++;
      if (j_5 == end_6) {
        alert("Return all complete");
        $("#returnAll").remove();
      } else {
        aa_ = returncities_.cid[j_5];
        $("#cityDropdownMenu").val(aa_).change();
      }
    });
  }
  /**
   * @return {undefined}
   */
  function getbossinfo_() {
    var temp_2;
    bossinfo_ = {
      x : [],
      y : [],
      lvl : [],
      data : [],
      name : [],
      cont : [],
      distance : [],
      cid : []
    };
    var i_19;
    for (i_19 in wdata_.bosses) {
      /** @type {number} */
      var templvl_ = Number(wdata_.bosses[i_19].substr(1, 2)) - 10;
      /** @type {number} */
      var tempy_3 = Number(wdata_.bosses[i_19].substr(4, 3)) - 100;
      /** @type {number} */
      var tempx_3 = Number(wdata_.bosses[i_19].substr(7, 3)) - 100;
      /** @type {number} */
      var cid_ = tempy_3 * 65536 + tempx_3;
      bossinfo_.x.push(tempx_3);
      bossinfo_.y.push(tempy_3);
      bossinfo_.lvl.push(templvl_);
      bossinfo_.cont.push(Number(Math.floor(tempx_3 / 100) + 10 * Math.floor(tempy_3 / 100)));
      bossinfo_.data.push(wdata_.bosses[i_19]);
      bossinfo_.cid.push(cid_);
    }
  }
  /**
   * @return {undefined}
   */
  function openbosswin_() {
    var bosslist_ = {
      name : [],
      x : [],
      y : [],
      lvl : [],
      distance : [],
      cid : [],
      time : [],
      cont : []
    };
    var i_20;
    for (i_20 in bossinfo_.cont) {
      /** @type {number} */
      var distance_ = Math.sqrt((bossinfo_.x[i_20] - city_.x) * (bossinfo_.x[i_20] - city_.x) + (bossinfo_.y[i_20] - city_.y) * (bossinfo_.y[i_20] - city_.y));
      if ((city_.th[2] || city_.th[3] || city_.th[4] || city_.th[5] || city_.th[6] || city_.th[8] || city_.th[9] || city_.th[10] || city_.th[11]) && city_.th[14] == 0) {
        if (bossinfo_.cont[i_20] == city_.cont) {
          if (city_.th[2] || city_.th[3] || city_.th[4] || city_.th[5] || city_.th[6]) {
            /** @type {number} */
            var minutes_ = distance_ * ttspeed_[2] / ttspeedres_[2];
            /** @type {string} */
            var time_5 = Math.floor(minutes_ / 60) + "h " + Math.floor(minutes_ % 60) + "m";
          }
          if (city_.th[8] || city_.th[9] || city_.th[10] || city_.th[11]) {
            /** @type {number} */
            minutes_ = distance_ * ttspeed_[8] / ttspeedres_[8];
            /** @type {string} */
            time_5 = Math.floor(minutes_ / 60) + "h " + Math.floor(minutes_ % 60) + "m";
          }
          bosslist_.x.push(bossinfo_.x[i_20]);
          bosslist_.y.push(bossinfo_.y[i_20]);
          bosslist_.cid.push(Number(bossinfo_.y[i_20] * 65536 + bossinfo_.x[i_20]));
          bosslist_.lvl.push(bossinfo_.lvl[i_20]);
          bosslist_.distance.push(roundToTwo_(distance_));
          bosslist_.time.push(time_5);
          bosslist_.cont.push(bossinfo_.cont[i_20]);
        }
      }
      if (distance_ < 180) {
        if (city_.th[14] || city_.th[15] || city_.th[16]) {
          /** @type {number} */
          minutes_ = distance_ * ttspeed_[14] / ttspeedres_[14];
          /** @type {string} */
          time_5 = Math.floor(minutes_ / 60) + "h " + Math.floor(minutes_ % 60) + "m";
          bosslist_.x.push(bossinfo_.x[i_20]);
          bosslist_.y.push(bossinfo_.y[i_20]);
          bosslist_.cid.push(Number(bossinfo_.y[i_20] * 65536 + bossinfo_.x[i_20]));
          bosslist_.lvl.push(bossinfo_.lvl[i_20]);
          bosslist_.distance.push(roundToTwo_(distance_));
          bosslist_.time.push(time_5);
          bosslist_.cont.push(bossinfo_.cont[i_20]);
        }
      }
    }
    /** @type {string} */
    var bosswin_ = "<table id='bosstable' class='beigetablescrollp sortable'><thead><tr><th>Coordinates</th><th>Level</th><th>Continent</th><th>Travel Time</th><th id='hdistance'>Distance</th></tr></thead>";
    /** @type {string} */
    bosswin_ = bosswin_ + "<tbody>";
    for (i_20 in bosslist_.x) {
      /** @type {number} */
      var j_6 = bosses_.name.indexOf(bosslist_.name[i_20]);
      /** @type {string} */
      bosswin_ = bosswin_ + ("<tr id='bossline" + bosslist_.cid[i_20] + "' class='dunginf'><td id='cl" + bosslist_.cid[i_20] + "' class='coordblink shcitt' data='" + bosslist_.cid[i_20] + "' style='text-align: center;'>" + bosslist_.x[i_20] + ":" + bosslist_.y[i_20] + "</td>");
      /** @type {string} */
      bosswin_ = bosswin_ + ("<td style='text-align: center;font-weight: bold;'>" + bosslist_.lvl[i_20] + "</td><td style='text-align: center;'>" + bosslist_.cont[i_20] + "</td>");
      /** @type {string} */
      bosswin_ = bosswin_ + ("<td style='text-align: center;'>" + bosslist_.time[i_20] + "</td><td style='text-align: center;'>" + bosslist_.distance[i_20] + "</td></tr>");
    }
    /** @type {string} */
    bosswin_ = bosswin_ + "</tbody></table></div>";
    /** @type {string} */
    var idle_ = "<table id='idleunits' class='beigetablescrollp'><tbody><tr><td style='text-align: center;'><span>Idle troops:</span></td>";
    for (i_20 in city_.th) {
      /** @type {!Array} */
      var notallow_ = [0, 1, 7, 12, 13];
      if (notallow_.indexOf(i_20) == -1) {
        if (city_.th[i_20] > 0) {
          /** @type {string} */
          idle_ = idle_ + ("<td><div class='" + tpicdiv_[i_20] + "' style='text-align: right;'></div></td><td style='text-align: left;'><span id='thbr" + i_20 + "' style='text-align: left;'>" + city_.th[i_20] + "</span></td>");
        }
      }
    }
    /** @type {string} */
    idle_ = idle_ + "</tbody></table>";
    $("#bossbox").html(bosswin_);
    $("#idletroops").html(idle_);
    /** @type {(Element|null)} */
    var newTableObject_2 = document.getElementById("bosstable");
    sorttable.makeSortable(newTableObject_2);
    setTimeout(function() {
      $("#hdistance").trigger("click");
      setTimeout(function() {
        $("#hdistance").trigger("click");
      }, 100);
    }, 100);
    for (i_20 in bosslist_.x) {
      $("#cl" + bosslist_.cid[i_20]).click(function() {
        setTimeout(function() {
          $("#raidDungGo").trigger("click");
        }, 500);
      });
    }
  }
  /**
   * @return {undefined}
   */
  function bossele_() {
    var bopti_ = $("#cityplayerInfo div table tbody");
    /** @type {string} */
    var bzTS_ = "<tr><td>Vanq:</td><td></td></tr><tr><td>R/T:</td><td></td></tr><tr><td>Ranger:</td><td></td></tr><tr><td>Triari:</td><td></td></tr><tr><td>Arb:</td><td></td></tr><tr><td>horse:</td><td></td></tr><tr><td>Sorc:</td><td></td></tr><tr><td>Druid:</td><td></td></tr>";
    /** @type {string} */
    bzTS_ = bzTS_ + "<tr><td>Prietess:</td><td></td></tr><tr><td>Praetor:</td><td></td></tr><tr><td>Scout:</td><td></td></tr><tr><td>Galley:</td><td></td></tr><tr><td>Stinger:</td><td></td></tr><tr><td>Warships:</td><td></td></tr>";
    bopti_.append(bzTS_);
  }
  /**
   * @return {undefined}
   */
  function recallraidl100_() {
    /**
     * @return {undefined}
     */
    function loop_1() {
      var trlist_ = $("#commandtable tbody tr:nth-child(" + l_2 + ")");
      var lvlprog_ = $(trlist_).find(".commandinntabl tbody tr:nth-child(3) td:nth-child(1) span:nth-child(1)").text();
      var splitlp_ = lvlprog_.split("(");
      /** @type {number} */
      var Dungeon_lvl_ = Number(splitlp_[0].match(/\d+/gi));
      /** @type {number} */
      var Dungeion_prog_ = Number(splitlp_[1].match(/\d+/gi));
      var dungeon_ = splitlp_[0].substring(0, splitlp_[0].indexOf(","));
      if (dungeon_ === "Mountain Cavern") {
        /** @type {!Array} */
        loot_ = mountain_loot_;
      } else {
        /** @type {!Array} */
        loot_ = other_loot_;
      }
      /** @type {number} */
      var total_loot_c_ = Math.ceil(loot_[Number(Dungeon_lvl_) - 1] * (1 - Number(Dungeion_prog_) / 100 + 1));
      var Unitno_ = $(trlist_).find(".commandinntabl tbody tr:nth-child(1) td:nth-child(2) span").text();
      var temp7_ = Unitno_.match(/[\d,]+/g);
      /** @type {number} */
      var Units_raiding_ = Number(temp7_[0].replace(",", ""));
      /** @type {number} */
      var lootperraid_ = lootpertroop_ * Units_raiding_;
      /** @type {number} */
      var percentage_ofloot_ = Math.ceil(lootperraid_ / total_loot_c_ * 100);
      if (Number(percentage_ofloot_) < 90) {
        jQuery(trlist_).find(".commandinntabl tbody tr:nth-child(2) td:nth-child(1) table tbody tr td:nth-child(2)")[0].click();
        $("#raidrettimesela").val(1).change();
        setTimeout(function() {
          jQuery("#doneOG")[0].click();
        }, 300);
        setTimeout(function() {
          $("#outgoingPopUpBox").hide();
        }, 500);
      }
      l_2++;
      if (l_2 < m_) {
        setTimeout(loop_1, 1000);
      }
    }
    var loot_;
    var total_;
    /** @type {number} */
    var total_number_ = 0;
    /** @type {number} */
    var total_lootz_ = 0;
    /** @type {number} */
    var i_21 = 0;
    var x_75;
    for (x_75 in citytc_) {
      /** @type {number} */
      total_ = Number(citytc_[x_75]);
      /** @type {number} */
      total_number_ = total_number_ + total_ * Number(TS_type_[i_21]);
      /** @type {number} */
      total_lootz_ = total_lootz_ + total_ * Number(ttloot_[i_21]);
      /** @type {number} */
      i_21 = i_21 + 1;
      if (i_21 === 17) {
        break;
      }
    }
    /** @type {number} */
    var lootpertroop_ = total_lootz_ / total_number_;
    /** @type {number} */
    var l_2 = 1;
    /** @type {number} */
    var m_ = Number($("#commandtable tbody").length);
    loop_1();
  }
  /**
   * @return {undefined}
   */
  function carrycheck_() {
    var loot_1;
    var total_1;
    /** @type {number} */
    var total_number_1 = 0;
    /** @type {number} */
    var total_lootx_ = 0;
    /** @type {number} */
    var i_22 = 0;
    var x_76;
    for (x_76 in citytc_) {
      /** @type {number} */
      total_1 = Number(citytc_[x_76]);
      /** @type {number} */
      total_number_1 = total_number_1 + total_1 * Number(TS_type_[i_22]);
      /** @type {number} */
      total_lootx_ = total_lootx_ + total_1 * Number(ttloot_[i_22]);
      /** @type {number} */
      i_22 = i_22 + 1;
      if (i_22 === 17) {
        break;
      }
    }
    /** @type {number} */
    var lootpertroop_1 = total_lootx_ / total_number_1;
    /** @type {number} */
    i_22 = 1;
    for (; i_22 < $("#commandtable tbody").length; i_22++) {
      var trlist_1 = $("#commandtable tbody tr:nth-child(" + i_22 + ")");
      var lvlprog_1 = $(trlist_1).find(".commandinntabl tbody tr:nth-child(3) td:nth-child(1) span:nth-child(1)").text();
      var splitlp_1 = lvlprog_1.split("(");
      if (splitlp_1.length === 1) {
        continue;
      }
      /** @type {number} */
      var Dungeon_lvl_1 = Number(splitlp_1[0].match(/\d+/gi));
      /** @type {number} */
      var Dungeion_prog_1 = Number(splitlp_1[1].match(/\d+/gi));
      var dungeon_1 = splitlp_1[0].substring(0, splitlp_1[0].indexOf(","));
      if (dungeon_1 === "Mountain Cavern") {
        /** @type {!Array} */
        loot_1 = mountain_loot_;
      } else {
        /** @type {!Array} */
        loot_1 = other_loot_;
      }
      /** @type {number} */
      var total_loot_c_1 = Math.ceil(loot_1[Number(Dungeon_lvl_1) - 1] * (1 - Number(Dungeion_prog_1) / 100 + 1));
      var Unitno_1 = $(trlist_1).find(".commandinntabl tbody tr:nth-child(1) td:nth-child(2) span").text();
      var temp7_1 = Unitno_1.match(/[\d,]+/g);
      /** @type {number} */
      var Units_raiding_1 = Number(temp7_1[0].replace(",", ""));
      /** @type {number} */
      var lootperraid_1 = lootpertroop_1 * Units_raiding_1;
      /** @type {number} */
      var percentage_ofloot_1 = Math.ceil(lootperraid_1 / total_loot_c_1 * 100);
      $(trlist_1).find(".commandinntabl tbody tr:nth-child(3) td:nth-child(2)").attr("rowspan", 1);
      $(trlist_1).find(".commandinntabl tbody tr:nth-child(4) td:nth-child(1)").attr("colspan", 1);
      $(trlist_1).find(".commandinntabl tbody tr:nth-child(4)").append('<td colspan="1" class="bottdinncommtb3" style="text-align:right"></td>');
      $(trlist_1).find(".commandinntabl tbody tr:nth-child(4) td:nth-child(2)").text("Carry:" + percentage_ofloot_1 + "%");
    }
  }

  var count_14;
  /**
   * @param {number} total_loot_1
   * @return {undefined}
   */
  function carry_percentage_(total_loot_1) {
     /** @type {number} */
     var i_23 = 0;
     /** @type {number} */
     var home_loot_ = 0;
     /** @type {!Array} */
     var km_ = [];
     var x_77;
     for (x_77 in citytc_) {
       /** @type {number} */
       var home_ = Number(citytc_[x_77]);
       /** @type {number} */
       home_loot_ = home_loot_ + home_ * ttloot_[i_23];
       km_.push(home_);
       /** @type {number} */
       i_23 = i_23 + 1;
       if (i_23 === 17) {
         break;
       }
     }
     /** @type {number} */
     var scaledLoot = Math.ceil(total_loot_1 * GetCarry());
     if (home_loot_ > scaledLoot) {
       /** @type {number} */
       var option_numbers_ = Math.floor(home_loot_ / scaledLoot);
       if (option_numbers_ < count_14) {
         $("#WCcomcount").val(option_numbers_);
       } else {
         $("#WCcomcount").val(count_14);
       }
       for (i_23 in km_) {
         if (km_[i_23] !== 0) {          
          if (count_14 === 1) {
            if (km_[i_23] !== 0) {
              $("#rval" + i_23).val(km_[i_23]);
            }
          } else {
            if (km_[i_23] !== 0) {
              if (option_numbers_ < count_14) {
                /** @type {number} */
                km_[i_23] = Math.floor(km_[i_23] / option_numbers_);
                $("#rval" + i_23).val(km_[i_23]);
                if (km_[14]) {
                  $("#rval14").val("0");
                }
              } else {
                /** @type {number} */
                km_[i_23] = Math.floor(km_[i_23] / count_14);
                $("#rval" + i_23).val(km_[i_23]);
                if (km_[14]) {
                  $("#rval14").val("0");
                }
              }
            }
          }
       }
      }
      carry_percentage_2(total_loot_1);
  }
}
function carry_percentage_2(total_loot_1) {
  /** @type {number} */
  var troop_loot_ = 0;
  $(".tninput").each(function() {
    var trpinpid_ = $(this).attr("id");
    var TSnum_ = $(this).val();
    /** @type {number} */
    var ttttt_ = Number(trpinpid_.match(/\d+/gi));
    troop_loot_ = troop_loot_ + TSnum_ * ttloot_[ttttt_];
  });
  /** @type {number} */
  var percentage_loot_takable_ = Math.ceil(troop_loot_ / total_loot_1 * 100);
  $("#dungloctab").find(".addraiwc td:nth-child(3)").text("carry:" + percentage_loot_takable_ + "%");
}
  /**
   * @return {undefined}
   */
  function getDugRows_() {
    $('#dungloctab th:contains("Distance")').click();
    $('#dungloctab th:contains("Distance")').click();
    $("#dungloctab tr").each(function() {
      var buttont_ = $(this).find("button");
      var buttonid_ = buttont_.attr("id");
      var temp3_ = $(this).find("td:nth-child(2)").text();
      var temp4_ = $(this).find("td:nth-child(3)").text();
      var tempz2_ = temp3_.split(" ");
      var temp1_ = tempz2_[1];
      var temp2_ = temp4_.match(/\d+/gi);
      var tempz1_ = tempz2_[2];
      if (buttonid_) {
        buttont_.attr("lvl", temp1_);
        buttont_.attr("prog", temp2_);
        buttont_.attr("type", tempz1_);
      }
      $(buttont_).click(function() {
        var loot1_;
        /** @type {number} */
      var countz_ = Number($(".splitRaid").children("option").length);
      if (countz_ > 1) {
        /** @type {number} */
        count_14 = countz_ - 1;
      } else {
        /** @type {number} */
        count_14 = countz_;
      }
     
        var dunglvl_ = $(this).attr("lvl");
        var progress_ = $(this).attr("prog");
        var type_dung_ = $(this).attr("type");
        if (type_dung_ === "Mountain") {
          /** @type {!Array} */
          loot1_ = mountain_loot_;
        } else {
          /** @type {!Array} */
          loot1_ = other_loot_;
        }
        /** @type {number} */
        var total_loot_1 = Math.ceil(loot1_[Number(dunglvl_) - 1] * (1 - Number(progress_) / 100 + 1) * 1.02);
        $("#dungloctab").find(".addraiwc td:nth-child(4)").html("<button id='raid115' style='padding: 2px; border-radius: 4px;' class='greenb shRnTr'>115%</button><button id='raid108' style='padding: 2px; border-radius: 4px;' class='greenb shRnTr'>108%</button>");
        $("#dungloctab").find(".addraiwc td:nth-child(2)").html("<button id='raid100' style='padding: 2px; border-radius: 4px;' class='greenb shRnTr'>100%</button><button id='raid125' style='padding: 2px; border-radius: 4px;' class='greenb shRnTr'>125%</button>");
        
        $("#raid125").click(function() {
          localStorage['carry'] = 1.25;

            carry_percentage_(total_loot_1);
          }
        );
        $("#raid115").click(function() {
          localStorage['carry'] = 1.15;

            carry_percentage_(total_loot_1);
          }
        );
        $("#raid108").click(function() {
          localStorage['carry'] = 1.08;
         
            carry_percentage_(total_loot_1);
          }
        );
        $("#raid100").click(function() {
          localStorage['carry'] = 0.95;
         
            carry_percentage_(total_loot_1);
          }
        );
        
        setTimeout(function() {
          carry_percentage_(total_loot_1);
        }, 100);
        setTimeout(function() {
          carry_percentage_2(total_loot_1);
        }, 1000);
        $(".tninput").change(function() {
          carry_percentage_2(total_loot_1);
        });
        $("#WCcomcount").on("change", function() {
          if ($("#rval14").val()) {
            $("#rval14").val("0");
          }
          carry_percentage_2(total_loot_1);
          $(".tninput").change(function() {
            carry_percentage_2(total_loot_1);
          });
        });
      });
    });
  }
  /**
   * @return {undefined}
   */
  function Total_Research_() {
    /**
     * @param {?} ldata_
     * @return {undefined}
     */
    function setloyal_(ldata_) {
      $.each(ldata_.t, function(key_37, value_85) {
        if (key_37 == 2) {
          $.each(this, function(key_38, value_86) {
            vexemis_ = vexemis_ + this.f;
          });
        }
        if (key_37 == 4) {
          $.each(this, function(key_39, value_87) {
            cyndros_ = cyndros_ + this.f;
          });
        }
        if (key_37 == 6) {
          $.each(this, function(key_40, value_88) {
            ylanna_ = ylanna_ + this.f;
          });
        }
        if (key_37 == 8) {
          $.each(this, function(key_41, value_89) {
            naera_ = naera_ + this.f;
          });
        }
      });
      /** @type {number} */
      ylanna_ = Math.min(ylanna_, 100);
      /** @type {number} */
      naera_ = Math.min(naera_, 100);
      /** @type {number} */
      vexemis_ = Math.min(vexemis_, 100);
      /** @type {number} */
      cyndros_ = Math.min(cyndros_, 100);
      var research_ = cotg.player.research();
      Total_Combat_Research_[2] += Number(naera_) * 0.5 / 100 + Number(Res_[research_[30]]) / 100;
      Total_Combat_Research_[3] += Number(naera_) * 0.5 / 100 + Number(Res_[research_[31]]) / 100;
      Total_Combat_Research_[4] += Number(naera_) * 0.5 / 100 + Number(Res_[research_[32]]) / 100;
      Total_Combat_Research_[5] += Number(vexemis_) * 0.5 / 100 + Number(Res_[research_[33]]) / 100;
      Total_Combat_Research_[6] += Number(vexemis_) * 0.5 / 100 + Number(Res_[research_[34]]) / 100;
      Total_Combat_Research_[7] += Number(vexemis_) * 0.5 / 100 + Number(Res_[research_[46]]) / 100;
      Total_Combat_Research_[8] += Number(naera_) * 0.5 / 100 + Number(Res_[research_[35]]) / 100;
      Total_Combat_Research_[9] += Number(naera_) * 0.5 / 100 + Number(Res_[research_[36]]) / 100;
      Total_Combat_Research_[10] += Number(vexemis_) * 0.5 / 100 + Number(Res_[research_[37]]) / 100;
      Total_Combat_Research_[11] += Number(vexemis_) * 0.5 / 100 + Number(Res_[research_[38]]) / 100;
      Total_Combat_Research_[14] += Number(ylanna_) * 0.5 / 100 + Number(Res_[research_[44]]) / 100;
      Total_Combat_Research_[15] += Number(ylanna_) * 0.5 / 100 + Number(Res_[research_[43]]) / 100;
      Total_Combat_Research_[16] += Number(cyndros_) * 0.5 / 100 + Number(Res_[research_[45]]) / 100;
    }
    jQuery.ajax({
      url : "includes/gaLoy.php",
      type : "POST",
      async: false,
      success : function success_(data_34) {
        /** @type {*} */
        var ldata_1 = JSON.parse(data_34);
        setloyal_(ldata_1);
      }
    });
  }
  /**
   * @return {undefined}
   */
  function setnearhub_() {
    /** @type {!Array} */
    var res_ = [0, 0, 0, 0, 1, 130000, 130000, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 300000, 300000, 300000, 400000];
    var aa_1 = city_.mo;
    var hubs_ = {
      cid : [],
      distance : []
    };
    $.each(clc_, function(key_42, value_90) {
      if (key_42 == $("#selHub").val()) {
        /** @type {number} */
        hubs_.cid = value_90;
      }
    });
    var i_25;
    for (i_25 in hubs_.cid) {
      /** @type {number} */
      var tempx_4 = Number(hubs_.cid[i_25] % 65536);
      /** @type {number} */
      var tempy_4 = Number((hubs_.cid[i_25] - tempx_4) / 65536);
      hubs_.distance.push(Math.sqrt((tempx_4 - city_.x) * (tempx_4 - city_.x) + (tempy_4 - city_.y) * (tempy_4 - city_.y)));
    }
    /** @type {number} */
    var mindist_ = Math.min.apply(Math, hubs_.distance);
    var nearesthub_ = hubs_.cid[hubs_.distance.indexOf(mindist_)];
    if ($("#addwalls").prop("checked") == true) {
      /** @type {number} */
      aa_1[26] = 1;
    }
    if ($("#addtowers").prop("checked") == true) {
      /** @type {number} */
      aa_1[27] = 1;
    }
    if ($("#addbuildings").prop("checked") == true) {
      /** @type {!Array} */
      aa_1[51] = [1, $("#cablev").val()];
      /** @type {!Array} */
      aa_1[68] = [1, 10];
      /** @type {!Array} */
      aa_1[69] = [1, 10];
      /** @type {!Array} */
      aa_1[70] = [1, 10];
      /** @type {!Array} */
      aa_1[71] = [1, 10];
      /** @type {number} */
      aa_1[1] = 1;
    }
    res_[14] = nearesthub_;
    res_[15] = nearesthub_;
    res_[5] = $("#woodin").val();
    res_[6] = $("#stonein").val();
    res_[7] = $("#ironin").val();
    res_[8] = $("#foodin").val();
    var k_;
    for (k_ in res_) {
      aa_1[28 + Number(k_)] = res_[k_];
    }
    var dat_1 = {
      a : JSON.stringify(aa_1),
      b : cdata_.cid
    };
    jQuery.ajax({
      url : "includes/mnio.php",
      type : "POST",
      async: false,
      data : dat_1
    });
  }
  /**
   * @return {undefined}
   */
  function setinfantry_() {
    /** @type {!Array} */
    var res_1 = [0, 0, 0, 0, 1, 575000, 575000, 575000, 575000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 575000, 575000, 575000, 575000];
    var aa_2 = city_.mo;
    var hubs_1 = {
      cid : [],
      distance : []
    };
    $.each(clc_, function(key_43, value_91) {
      if (key_43 == $("#selHub").val()) {
        /** @type {number} */
        hubs_1.cid = value_91;
      }
    });
    var i_26;
    for (i_26 in hubs_1.cid) {
      /** @type {number} */
      var tempx_5 = Number(hubs_1.cid[i_26] % 65536);
      /** @type {number} */
      var tempy_5 = Number((hubs_1.cid[i_26] - tempx_5) / 65536);
      hubs_1.distance.push(Math.sqrt((tempx_5 - city_.x) * (tempx_5 - city_.x) + (tempy_5 - city_.y) * (tempy_5 - city_.y)));
    }
    /** @type {number} */
    var mindist_1 = Math.min.apply(Math, hubs_1.distance);
    var nearesthub_1 = hubs_1.cid[hubs_1.distance.indexOf(mindist_1)];
    if ($("#addwalls").prop("checked") == true) {
      /** @type {number} */
      aa_2[26] = 1;
    }
    if ($("#addtowers").prop("checked") == true) {
      /** @type {number} */
      aa_2[27] = 1;
    }
    if ($("#addbuildings").prop("checked") == true) {
      /** @type {!Array} */
      aa_2[51] = [1, $("#cablev").val()];
      /** @type {!Array} */
      aa_2[60] = [1, 10];
      /** @type {!Array} */
      aa_2[62] = [1, 10];
      /** @type {!Array} */
      aa_2[68] = [1, 10];
      /** @type {!Array} */
      aa_2[69] = [1, 10];
      /** @type {!Array} */
      aa_2[70] = [1, 10];
      /** @type {!Array} */
      aa_2[71] = [1, 10];
      /** @type {!Array} */
      aa_2[73] = [1, 10];
      /** @type {number} */
      aa_2[1] = 1;
    }
    res_1[14] = nearesthub_1;
    res_1[15] = nearesthub_1;
    res_1[5] = $("#woodin").val();
    res_1[6] = $("#stonein").val();
    res_1[7] = $("#ironin").val();
    res_1[8] = $("#foodin").val();
    var k_1;
    for (k_1 in res_1) {
      aa_2[28 + Number(k_1)] = res_1[k_1];
    }
    var dat_2 = {
      a : JSON.stringify(aa_2),
      b : cdata_.cid
    };
    jQuery.ajax({
      url : "includes/mnio.php",
      type : "POST",
      async: false,
      data : dat_2
    });
  }
  /**
   * @return {undefined}
   */
  function opensumwin_() {
    /** @type {boolean} */
    sum_ = false;
    /** @type {string} */
    var sumwin_ = "<div id='sumWin' style='width:60%;height:50%;left: 360px; z-index: 2000;' class='popUpBox'><div id='popsum' class='popUpBar'><span class=\"ppspan\">Cities Summaries</span> <button id=\"sumX\" onclick=\"$('#sumWin').hide();\" class=\"xbutton greenb\"><div id=\"xbuttondiv\"><div><div id=\"centxbuttondiv\"></div></div></div></button></div><div class=\"popUpWindow\" style='height:100%'>";
    /** @type {string} */
    sumwin_ = sumwin_ + "<div id='sumdiv' class='beigetabspopup' style='background:none;border: none;padding: 0px;height:74%;'><ul id='sumtabs' role='tablist'><li role='tab'><a href='#resTab' role='presentation'>Resources</a></li>";
    /** @type {string} */
    sumwin_ = sumwin_ + "<li role='tab'><a href='#troopsTab' role='presentation'>Troops</a></li><li role='tab'><a href='#raidTab' role='presentation'>Raids</a></li><li role='tab'><a href='#raidoverTab' role='presentation'>Raids Overview</a></li>";
    /** @type {string} */
    sumwin_ = sumwin_ + "<li role='tab'><a href='#supportTab' role='presentation'>Support</a></li></ul>";
    /** @type {string} */
    sumwin_ = sumwin_ + "<div id='resTab'><button id='resup' class='greenb' style='font-size:14px;border-radius:6px; margin:4px;'>Update</button><span style='margin-left:50px;'>Show cities from: </span>";
    /** @type {string} */
    sumwin_ = sumwin_ + "<div class='beigemenutable scroll-pane' style='width:99%;height:100%;margin-left:4px;' ><table id='restable'>";
    /** @type {string} */
    sumwin_ = sumwin_ + "<thead><th>Name</th><th colspan='2'>Notes</th><th>Coords</th><th>Wood</th><th>(Storage)</th><th>Stones</th><th>(Storage)</th><th>Iron</th><th>(Storage)</th><th>Food</th><th>(Storage)</th><th>Carts</th><th>(Total)</th><th>Ships</th><th>(Total)</th><th>Score</th></thead></table></div></div>";
    /** @type {string} */
    sumwin_ = sumwin_ + "<div id='troopsTab'><button id='troopsup' class='greenb' style='font-size:14px;border-radius:6px;margin:4px;'>Update</button><span style='margin-left:50px;'>Show cities from: </span>";
    /** @type {string} */
    sumwin_ = sumwin_ + "<div  class='beigemenutable scroll-pane' style='width:99%;height:95%;margin-left:4px;'><table id='troopstable' style='width:250%'>";
    /** @type {string} */
    sumwin_ = sumwin_ + ("<thead><tr data='0'><th>Name</th><th style='width:150px;'>Notes</th><th>Coords</th><th><div class='" + tpicdiv_[8] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[1] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[11] + "'></div>(home)</th><th>(Total)</th></th>");
    /** @type {string} */
    sumwin_ = sumwin_ + ("<th><div class='" + tpicdiv_[14] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[0] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[10] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[9] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[4] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[12] + "'></div>(home)</th><th>(Total)</th>");
    /** @type {string} */
    sumwin_ = sumwin_ + ("<th><div class='" + tpicdiv_[2] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[13] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[7] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[17] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[6] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[15] + "'></div>(home)</th><th>(Total)</th>");
    /** @type {string} */
    sumwin_ = sumwin_ + ("<th><div class='" + tpicdiv_[3] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[5] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[16] + "'></div>(home)</th><th>(Total)</th><th>TS(home)</th><th>(Total)</th>");
    /** @type {string} */
    sumwin_ = sumwin_ + "</tr></thead></table></div></div>";
    /** @type {string} */
    sumwin_ = sumwin_ + "<div id='raidTab'><button id='raidup' class='greenb' style='font-size:14px;border-radius:6px; margin:4px;'>Update</button><span style='margin-left:50px;'>Number of reports to show:</span><select id='raidsturnc' class='greensel'><option value='100'>100</option><option value='500'>500</option><option value='1000'>1000</option><option value='10000'>10000</option></select>";
    /** @type {string} */
    sumwin_ = sumwin_ + "<div class='beigemenutable scroll-pane' style='width:99%;height:110%;margin-left:4px;' ><table id='raidtable'>";
    /** @type {string} */
    sumwin_ = sumwin_ + "<thead><th>Report</th><th>Type</th><th>Cavern progress</th><th>losses</th><th>Carry</th><th>Date</th><th>Origin</th></thead></table></div></div>";
    /** @type {string} */
    sumwin_ = sumwin_ + "<div id='raidoverTab'><button id='raidoverup' class='greenb' style='font-size:14px;border-radius:6px; margin:4px;'>Update</button><span style='margin-left:50px;'>Show cities from: </span>";
    /** @type {string} */
    sumwin_ = sumwin_ + "<div class='beigemenutable scroll-pane' style='width:99%;height:100%;margin-left:4px;' ><table id='raidovertable'>";
    /** @type {string} */
    sumwin_ = sumwin_ + "<thead><th></th><th>Name</th><th colspan='2'>Notes</th><th>Coords</th><th>Raids</th><th>Out</th><th>In</th><th>Raiding TS</th><th>Resources</th></thead></table></div></div>";
    /** @type {string} */
    sumwin_ = sumwin_ + "<div id='supportTab'><button id='supportup' class='greenb' style='font-size:14px;border-radius:6px; margin:4px;'>Update</button>";
    /** @type {string} */
    sumwin_ = sumwin_ + "<div class='beigemenutable scroll-pane' style='width:99%;height:110%;margin-left:4px;' ><table id='supporttable'>";
    /** @type {string} */
    sumwin_ = sumwin_ + "<thead><th></th><th>Player</th><th>City</th><th>Coords</th><th>Alliance</th><th>TS supporting</th><th>TS sending</th><th>TS returning</th></thead></table></div></div>";
    /** @type {string} */
    sumwin_ = sumwin_ + "</div></div>";
    $("#reportsViewBox").after(sumwin_);
    $("#sumWin").draggable({
      handle : ".popUpBar",
      containment : "window",
      scroll : false
    });
    $("#sumWin").resizable();
    $(".popUpBar").click(function() {
      if ($(this).parent().attr("id") == "sumWin") {
        setTimeout(function() {
          $("#sumWin").css("z-index", 4001);
        }, 200);
      } else {
        setTimeout(function() {
          $("#sumWin").css("z-index", 3000);
        }, 200);
      }
    });
    $("#sumdiv").tabs();
    var selres_ = $("#organiser").clone(false).attr({
      id : "selRes",
      style : "height: 30px;width:150px;font-size:14px;border-radius:6px;margin:7px"
    });
    var seltroops_ = $("#organiser").clone(false).attr({
      id : "selTroops",
      style : "height: 30px;width:150px;font-size:14px;border-radius:6px;margin:7px"
    });
    var selraids_ = $("#organiser").clone(false).attr({
      id : "selRaids",
      style : "height: 30px;width:150px;font-size:14px;border-radius:6px;margin:7px"
    });
    $("#resup").next().after(selres_);
    $("#troopsup").next().after(seltroops_);
    $("#raidoverup").next().after(selraids_);
    $("#selTroops").val("all").change();
    $("#selRes").val("all").change();
    $("#selRaids").val("all").change();
    $("#resup").click(function() {
      $("#selRes").val("all").change();
      jQuery.ajax({
        url : "overview/citover.php",
        type : "POST",
        async: false,
        success : function success_1(data_35) {
          /** @type {*} */
          var sumres_ = JSON.parse(data_35);
          updateres_(sumres_);
        }
      });
    });
    $("#troopsup").click(function() {
      $("#selTroops").val("all").change();
      var notes_ = {
        id : [],
        notes : []
      };
      jQuery.ajax({
        url : "overview/citover.php",
        type : "POST",
        async: false,
        success : function success_2(data_36) {
          /** @type {*} */
          var sumres_1 = JSON.parse(data_36);
          $.each(sumres_1, function() {
            notes_.id.push(this.id);
            notes_.notes.push(this.reference);
          });
          jQuery.ajax({
            url : "overview/trpover.php",
            type : "POST",
            async: false,
            success : function success_3(data_37) {
              /** @type {*} */
              var troopsres_ = JSON.parse(data_37);
              updatetroops_(troopsres_, notes_);
            }
          });
        }
      });
    });
    $("#raidup").click(function() {
      jQuery.ajax({
        url : "overview/rreps.php",
        type : "POST",
        async: false,
        success : function success_4(data_38) {
          /** @type {*} */
          var raids_ = JSON.parse(data_38);
          updateraids_(raids_, $("#raidsturnc").val());
        }
      });
    });
    $("#raidoverup").click(function() {
      var notes_1 = {
        id : [],
        notes : []
      };
      jQuery.ajax({
        url : "overview/citover.php",
        type : "POST",
        async: false,
        success : function success_5(data_39) {
          /** @type {*} */
          var sumres_2 = JSON.parse(data_39);
          $.each(sumres_2, function() {
            notes_1.id.push(this.id);
            notes_1.notes.push(this.reference);
          });
          jQuery.ajax({
            url : "overview/graid.php",
            type : "POST",
            async: false,
            success : function success_6(data_40) {
              /** @type {*} */
              var raids_1 = JSON.parse(data_40);
              updateraidover_(raids_1, notes_1);
            }
          });
        }
      });
    });
    $("#supportup").click(function() {
      jQuery.ajax({
        url : "overview/reinover.php",
        type : "POST",
        async: false,
        success : function success_7(data_41) {
          /** @type {*} */
          var support_ = JSON.parse(data_41);
          updatesupport_(support_);
        }
      });
    });
    /** @type {!Array} */
    var citylist_ = [];
    $("#selTroops").change(function() {
      if ($("#selTroops").val() == "all") {
        $("#troopstable tr").each(function() {
          $(this).show();
        });
      } else {
        $.each(pdata_.clc, function(key_44, value_92) {
          if (key_44 == $("#selTroops").val()) {
            /** @type {!Object} */
            citylist_ = value_92;
          }
        });
        $("#troopstable tr").each(function() {
          if (citylist_.indexOf(Number($(this).attr("data"))) > -1) {
            $(this).show();
          } else {
            if (Number($(this).attr("data")) != 0) {
              $(this).hide();
            }
          }
        });
      }
    });
    $("#selRes").change(function() {
      if ($("#selRes").val() == "all") {
        $("#restable tr").each(function() {
          $(this).show();
        });
      } else {
        $.each(pdata_.clc, function(key_45, value_93) {
          if (key_45 == $("#selRes").val()) {
            /** @type {!Object} */
            citylist_ = value_93;
          }
        });
        $("#restable tr").each(function() {
          if (citylist_.indexOf(Number($(this).attr("data"))) > -1) {
            $(this).show();
          } else {
            if (Number($(this).attr("data")) != 0) {
              $(this).hide();
            }
          }
        });
      }
    });
    $("#selRaids").change(function() {
      if ($("#selRsaids").val() == "all") {
        $("#raidovertable tr").each(function() {
          $(this).show();
        });
      } else {
        $.each(pdata_.clc, function(key_46, value_94) {
          if (key_46 == $("#selRaids").val()) {
            /** @type {!Object} */
            citylist_ = value_94;
          }
        });
        $("#raidovertable tr").each(function() {
          if (citylist_.indexOf(Number($(this).attr("data"))) > -1) {
            $(this).show();
          } else {
            if (Number($(this).attr("data")) != 0) {
              $(this).hide();
            }
          }
        });
      }
    });
  }
  /**
   * @param {!Object} data_42
   * @param {!Object} notes_2
   * @return {undefined}
   */
  function updateraidover_(data_42, notes_2) {
    /** @type {string} */
    var raidovertab_ = "<thead><tr data='0'><th></th><th>Name</th><th colspan='2'>Notes</th><th>Coords</th><th>Raids</th><th>Out</th><th>In</th><th>Raiding TS</th><th>Resources</th></tr></thead><tbody>";
    $.each(data_42.a, function() {
      var cid_1 = this[0];
      var not_ = notes_2.notes[notes_2.id.indexOf(cid_1)];
      /** @type {number} */
      var x_79 = Number(cid_1 % 65536);
      /** @type {number} */
      var y_59 = Number((cid_1 - x_79) / 65536);
      raidovertab_ = raidovertab_ + ("<tr data='" + cid_1 + "'><td><button style='height: 20px;padding-top: 3px;border-radius:6px;' class='greenb recraid' data='" + cid_1 + "'>Recall Raids</button></td>");
      /** @type {string} */
      raidovertab_ = raidovertab_ + ("<td data='" + cid_1 + "' class='coordblink raidclink'>" + this[1] + "</td><td colspan='2'>" + not_ + "</td><td class='coordblink shcitt' data='" + cid_1 + "'>" + x_79 + ":" + y_59 + "</td><td>" + this[3] + "</td><td>" + this[6] + "</td><td>" + this[5] + "</td><td>" + this[4].toLocaleString() + "</td>");
      /** @type {string} */
      raidovertab_ = raidovertab_ + ("<td>" + (this[7] + this[8] + this[9] + this[10] + this[11]).toLocaleString() + "</td></tr>");
    });
    raidovertab_ = raidovertab_ + "</tbody>";
    $("#raidovertable").html(raidovertab_);
    $("#raidovertable td").css("text-align", "center");
    /** @type {(Element|null)} */
    var newTableObject_3 = document.getElementById("raidovertable");
    sorttable.makeSortable(newTableObject_3);
    $(".raidclink").click(function() {
      var aa_3 = $(this).attr("data");
      $("#organiser").val("all").change();
      $("#cityDropdownMenu").val(aa_3).change();
    });
    $(".recraid").click(function() {
      var id_5 = $(this).attr("data");
      var dat_3 = {
        a : id_5
      };
      jQuery.ajax({
        url : "overview/rcallall.php",
        type : "POST",
        async: false,
        data : dat_3
      });
      $(this).remove();
    });
  }
  /**
   * @param {?} data_43
   * @return {undefined}
   */
  function updatesupport_(data_43) {
    /** @type {string} */
    var supporttab_ = "<thead><th></th><th>Player</th><th>City</th><th>Coords</th><th>Alliance</th><th>TS supporting</th><th>TS sending</th><th>TS returning</th></thead><tbody>";
    $.each(data_43, function() {
      var tid_3 = this[9][0][1];
      supporttab_ = supporttab_ + ("<tr><td><button class='greenb expsup' style='height: 20px;padding-top: 3px;border-radius:6px;'>Expand</button><button data='" + tid_3 + "' class='greenb recasup' style='height: 20px;padding-top: 3px;border-radius:6px;'>Recall all</button>");
      /** @type {string} */
      supporttab_ = supporttab_ + ("</td><td class='playerblink'>" + this[0] + "</td><td>" + this[2] + "</td><td class='coordblink shcitt' data='" + tid_3 + "'>" + this[3] + ":" + this[4] + "</td><td class='allyblink'>" + this[1] + "</td><td>" + this[6] + "</td><td>" + this[7] + "</td><td>" + this[8] + "</td></tr>");
      /** @type {string} */
      supporttab_ = supporttab_ + "<tr class='expsuptab'><td colspan='8'><div class='beigemenutable' style='width:98%;'><table><thead><th></th><th>City</th><th>Coords</th><th colspan='2'>Troops</th><th>Status</th><th>Arrival</th></thead><tbody>";
      var i_27;
      for (i_27 in this[9]) {
        var sid_1 = this[9][i_27][15];
        var status_;
        var id_6 = this[9][i_27][10];
        switch(this[9][i_27][0]) {
          case 1:
            /** @type {string} */
            supporttab_ = supporttab_ + "<tr style='color: purple;'><td></td>";
            /** @type {string} */
            status_ = "Sending";
            break;
          case 2:
            /** @type {string} */
            supporttab_ = supporttab_ + ("<tr style='color: green;'><td><button class='greenb recsup' data='" + id_6 + "' style='height: 20px;padding-top: 3px;border-radius:6px;'>Recall</button></td>");
            /** @type {string} */
            status_ = "Reinforcing";
            break;
          case 0:
            /** @type {string} */
            supporttab_ = supporttab_ + "<tr style='color: #00858E;'><td></td>";
            /** @type {string} */
            status_ = "returning";
            break;
        }
        /** @type {string} */
        supporttab_ = supporttab_ + ("<td data='" + sid_1 + "' class='coordblink suplink'>" + this[9][i_27][11] + "</td><td class='coordblink shcitt' data='" + sid_1 + "'>" + this[9][i_27][12] + ":" + this[9][i_27][13] + "</td>");
        /** @type {string} */
        supporttab_ = supporttab_ + "<td colspan='2'>";
        var j_7;
        for (j_7 in this[9][i_27][8]) {
          /** @type {string} */
          supporttab_ = supporttab_ + (this[9][i_27][8][j_7] + ",");
        }
        /** @type {string} */
        supporttab_ = supporttab_ + ("</td><td>" + status_ + "</td><td>" + this[9][i_27][9] + "</td></tr>");
      }
      /** @type {string} */
      supporttab_ = supporttab_ + "</tbody></table></div></td></tr><tr class='usles'></tr>";
    });
    $("#supporttable").html(supporttab_);
    $("#supporttable td").css("text-align", "center");
    $(".expsuptab").toggle();
    $(".usles").hide();
    /** @type {(Element|null)} */
    var newTableObject_4 = document.getElementById("supporttable");
    sorttable.makeSortable(newTableObject_4);
    $(".suplink").click(function() {
      var cid_2 = $(this).attr("data");
      $("#organiser").val("all").change();
      $("#cityDropdownMenu").val(cid_2).change();
    });
    $(".recsup").click(function() {
      var id_7 = $(this).attr("data");
      var dat_4 = {
        a : id_7
      };
      jQuery.ajax({
        url : "overview/reinreca.php",
        type : "POST",
        async: false,
        data : dat_4
      });
      $(this).remove();
    });
    $(".expsup").click(function() {
      $(this).parent().parent().next().toggle();
    });
    $(".recasup").click(function() {
      var id_8 = $(this).attr("data");
      var dat_5 = {
        a : id_8
      };
      jQuery.ajax({
        url : "overview/reinrecall.php",
        type : "POST",
        async: false,
        data : dat_5
      });
      $(this).remove();
    });
  }
  /**
   * @param {!Object} data_44
   * @param {?} turnc_
   * @return {undefined}
   */
  function updateraids_(data_44, turnc_) {
    /** @type {string} */
    var raidtab_ = "<thead><th>Report</th><th>Type</th><th>Cavern progress</th><th>losses</th><th>Carry</th><th>Date</th><th>Origin</th></thead><tbody>";
    /** @type {number} */
    var i_28 = 0;
    $.each(data_44.b, function() {
      if (i_28 < turnc_) {
        if (this[2] <= 2) {
          raidtab_ = raidtab_ + "<tr style='color:green;'>";
        } else {
          if (2 < this[2] && this[2] <= 5) {
            raidtab_ = raidtab_ + "<tr style='color:#CF6A00;'>";
          } else {
            if (this[2] > 5) {
              raidtab_ = raidtab_ + "<tr style='color:red;'>";
            }
          }
        }
        /** @type {string} */
        raidtab_ = raidtab_ + ("<td class='gFrep' data='" + this[6] + "'><span class='unread'>Share report</td><td>" + this[0] + "</span></td><td>" + this[8] + "%" + "</td><td>" + this[2] + "%" + "</td><td>" + this[3] + "%" + "</td><td>" + this[4] + "</td><td>" + this[1] + "</td></tr>");
      }
      i_28++;
    });
    raidtab_ = raidtab_ + "</tbody>";
    $("#raidtable").html(raidtab_);
    $("#raidtable td").css("text-align", "center");
    /** @type {(Element|null)} */
    var newTableObject_5 = document.getElementById("raidtable");
    sorttable.makeSortable(newTableObject_5);
  }
  /**
   * @param {?} data_45
   * @return {undefined}
   */
  function updateres_(data_45) {
    /** @type {string} */
    var restabb_ = "<thead><tr data='0'><th>Name</th><th colspan='2'>Notes</th><th>Coords</th><th>Wood</th><th>(Storage)</th><th>Stones</th><th>(Storage)</th><th>Iron</th><th>(Storage)</th><th>Food</th><th>(Storage)</th><th>Carts</th><th>(Total)</th><th>Ships</th><th>(Total)</th><th>Score</th></tr></thead><tbody>";
    /** @type {number} */
    var woodtot_ = 0;
    /** @type {number} */
    var irontot_ = 0;
    /** @type {number} */
    var stonetot_ = 0;
    /** @type {number} */
    var foodtot_ = 0;
    /** @type {number} */
    var cartstot_ = 0;
    /** @type {number} */
    var shipstot_ = 0;
    $.each(data_45, function() {
      var cid_3 = this.id;
      /** @type {number} */
      var x_80 = Number(cid_3 % 65536);
      /** @type {number} */
      var y_60 = Number((cid_3 - x_80) / 65536);
      restabb_ = restabb_ + ("<tr data='" + cid_3 + "'><td id='cn" + cid_3 + "' class='coordblink'>" + this.city + "</td><td colspan='2'>" + this.reference + "</td><td class='coordblink shcitt' data='" + cid_3 + "'>" + x_80 + ":" + y_60 + "</td>");
      var res_2;
      var sto_;
      cartstot_ = cartstot_ + this.carts_total;
      shipstot_ = shipstot_ + this.ships_total;
      /** @type {number} */
      var i_29 = 0;
      for (; i_29 < 4; i_29++) {
        switch(i_29) {
          case 0:
            res_2 = this.wood;
            woodtot_ = woodtot_ + res_2;
            sto_ = this.wood_storage;
            break;
          case 1:
            res_2 = this.stone;
            stonetot_ = stonetot_ + res_2;
            sto_ = this.stone_storage;
            break;
          case 2:
            res_2 = this.iron;
            irontot_ = irontot_ + res_2;
            sto_ = this.iron_storage;
            break;
          case 3:
            res_2 = this.food;
            foodtot_ = foodtot_ + res_2;
            sto_ = this.food_storage;
            break;
        }
        if (res_2 / sto_ < 0.9) {
          /** @type {string} */
          restabb_ = restabb_ + ("<td style='color:green;'>" + res_2.toLocaleString() + "</td><td>" + sto_.toLocaleString() + "</td>");
        } else {
          if (res_2 / sto_ < 1 && res_2 / sto_ >= 0.9) {
            /** @type {string} */
            restabb_ = restabb_ + ("<td style='color:#CF6A00;'>" + res_2.toLocaleString() + "</td><td>" + sto_.toLocaleString() + "</td>");
          } else {
            if (res_2 == sto_) {
              /** @type {string} */
              restabb_ = restabb_ + ("<td style='color:red;'>" + res_2.toLocaleString() + "</td><td>" + sto_.toLocaleString() + "</td>");
            }
          }
        }
      }
      /** @type {string} */
      restabb_ = restabb_ + ("<td>" + this.carts_home.toLocaleString() + "</td><td>" + this.carts_total.toLocaleString() + "</td><td>" + this.ships_home + "</td><td>" + this.ships_total + "</td><td>" + this.score.toLocaleString() + "</td></tr>");
    });
    restabb_ = restabb_ + "</tbody>";
    $("#restable").html(restabb_);
    $("#restable td").css("text-align", "center");
    /** @type {(Element|null)} */
    var newTableObject_6 = document.getElementById("restable");
    sorttable.makeSortable(newTableObject_6);
    /** @type {string} */
    var tottab_ = "<div id='rsum' class='beigemenutable scroll-pane' style='width: 99%;margin-left: 4px;'><table><td>Total wood: </td><td>" + woodtot_.toLocaleString() + "</td><td>Total stones: </td><td>" + stonetot_.toLocaleString() + "</td><td>Total iron: </td><td>" + irontot_.toLocaleString() + "</td><td>Total food: </td><td>" + foodtot_.toLocaleString() + "</td>";
    /** @type {string} */
    tottab_ = tottab_ + ("<td>Total carts: </td><td>" + cartstot_.toLocaleString() + "</td><td>Total ships: </td><td>" + shipstot_.toLocaleString() + "</td></table></div>");
    $("#rsum").remove();
    $("#resTab").append(tottab_);
    $("#rsum td").css("text-align", "center");
    $.each(data_45, function() {
      var aa_4 = this.id;
      $("#cn" + aa_4).click(function() {
        $("#organiser").val("all").change();
        $("#cityDropdownMenu").val(aa_4).change();
      });
    });
  }
  /**
   * @param {?} data_46
   * @param {!Object} notes_3
   * @return {undefined}
   */
  function updatetroops_(data_46, notes_3) {
    /** @type {string} */
    var troopstab_ = "<thead><tr data='0'><th>Name</th><th style='width:150px;'>Notes</th><th>Coords</th><th><div class='" + tpicdiv_[8] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[1] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[11] + "'></div>(home)</th><th>(Total)</th></th>";
    troopstab_ = troopstab_ + ("<th><div class='" + tpicdiv_[14] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[0] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[10] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[9] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[4] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[12] + "'></div>(home)</th><th>(Total)</th>");
    troopstab_ = troopstab_ + ("<th><div class='" + tpicdiv_[2] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[13] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[7] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[17] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[6] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[15] + "'></div>(home)</th><th>(Total)</th>");
    troopstab_ = troopstab_ + ("<th><div class='" + tpicdiv_[3] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[5] + "'></div>(home)</th><th>(Total)</th><th><div class='" + tpicdiv_[16] + "'></div>(home)</th><th>(Total)</th><th>TS(home)</th><th>(Total)</th>");
    troopstab_ = troopstab_ + "</tr></thead><tbody>";
    /** @type {number} */
    var arbstot_ = 0;
    /** @type {number} */
    var balltot_ = 0;
    /** @type {number} */
    var druidstot_ = 0;
    /** @type {number} */
    var galltot_ = 0;
    /** @type {number} */
    var guardstot_ = 0;
    /** @type {number} */
    var horsetot_ = 0;
    /** @type {number} */
    var praetorstot_ = 0;
    /** @type {number} */
    var priesttot_ = 0;
    /** @type {number} */
    var ramstot_ = 0;
    /** @type {number} */
    var rangerstot_ = 0;
    /** @type {number} */
    var scorptot_ = 0;
    /** @type {number} */
    var scoutstot_ = 0;
    /** @type {number} */
    var senatortot_ = 0;
    /** @type {number} */
    var sorctot_ = 0;
    /** @type {number} */
    var stingerstot_ = 0;
    /** @type {number} */
    var triaritot_ = 0;
    /** @type {number} */
    var vanqstot_ = 0;
    /** @type {number} */
    var warshipstot_ = 0;
    var tshome_;
    var tstot_;
    var thome_;
    var ttot_;
    $.each(data_46, function() {
      /** @type {number} */
      tshome_ = 0;
      /** @type {number} */
      tstot_ = 0;
      var cid_4 = this.id;
      var not_1 = notes_3.notes[notes_3.id.indexOf(cid_4)];
      /** @type {number} */
      var x_81 = Number(cid_4 % 65536);
      /** @type {number} */
      var y_61 = Number((cid_4 - x_81) / 65536);
      troopstab_ = troopstab_ + ("<tr data='" + cid_4 + "'><td id='cnt" + cid_4 + "' class='coordblink'>" + this.c + "</td><td style='width:150px;'>" + not_1 + "</td><td class='coordblink shcitt' data='" + cid_4 + "'>" + x_81 + ":" + y_61 + "</td>");
      thome_ = this.Arbalist_home;
      ttot_ = this.Arbalist_total;
      arbstot_ = arbstot_ + ttot_;
      /** @type {number} */
      tshome_ = tshome_ + 2 * thome_;
      /** @type {number} */
      tstot_ = tstot_ + 2 * ttot_;
      /** @type {string} */
      troopstab_ = troopstab_ + ("<td>" + thome_.toLocaleString() + "</td><td>" + ttot_.toLocaleString() + "</td>");
      thome_ = this.Ballista_home;
      ttot_ = this.Ballista_total;
      balltot_ = balltot_ + ttot_;
      /** @type {number} */
      tshome_ = tshome_ + 10 * thome_;
      /** @type {number} */
      tstot_ = tstot_ + 10 * ttot_;
      /** @type {string} */
      troopstab_ = troopstab_ + ("<td>" + thome_.toLocaleString() + "</td><td>" + ttot_.toLocaleString() + "</td>");
      thome_ = this.Druid_home;
      ttot_ = this.Druid_total;
      druidstot_ = druidstot_ + ttot_;
      /** @type {number} */
      tshome_ = tshome_ + 2 * thome_;
      /** @type {number} */
      tstot_ = tstot_ + 2 * ttot_;
      /** @type {string} */
      troopstab_ = troopstab_ + ("<td>" + thome_.toLocaleString() + "</td><td>" + ttot_.toLocaleString() + "</td>");
      thome_ = this.Galley_home;
      ttot_ = this.Galley_total;
      galltot_ = galltot_ + ttot_;
      /** @type {number} */
      tshome_ = tshome_ + 100 * thome_;
      /** @type {number} */
      tstot_ = tstot_ + 100 * ttot_;
      /** @type {string} */
      troopstab_ = troopstab_ + ("<td>" + thome_.toLocaleString() + "</td><td>" + ttot_.toLocaleString() + "</td>");
      thome_ = this.Guard_home;
      ttot_ = this.Guard_total;
      guardstot_ = guardstot_ + ttot_;
      tshome_ = tshome_ + thome_;
      tstot_ = tstot_ + ttot_;
      /** @type {string} */
      troopstab_ = troopstab_ + ("<td>" + thome_.toLocaleString() + "</td><td>" + ttot_.toLocaleString() + "</td>");
      thome_ = this.Horseman_home;
      ttot_ = this.Horseman_total;
      horsetot_ = horsetot_ + ttot_;
      tshome_ = tshome_ + 2 * thome_;
      tstot_ = tstot_ + 2 * ttot_;
      /** @type {string} */
      troopstab_ = troopstab_ + ("<td>" + thome_.toLocaleString() + "</td><td>" + ttot_.toLocaleString() + "</td>");
      thome_ = this.Praetor_home;
      ttot_ = this.Praetor_total;
      praetorstot_ = praetorstot_ + ttot_;
      tshome_ = tshome_ + 2 * thome_;
      tstot_ = tstot_ + 2 * ttot_;
      /** @type {string} */
      troopstab_ = troopstab_ + ("<td>" + thome_.toLocaleString() + "</td><td>" + ttot_.toLocaleString() + "</td>");
      thome_ = this.Priestess_home;
      ttot_ = this.Priestess_total;
      priesttot_ = priesttot_ + ttot_;
      tshome_ = tshome_ + thome_;
      tstot_ = tstot_ + ttot_;
      /** @type {string} */
      troopstab_ = troopstab_ + ("<td>" + thome_.toLocaleString() + "</td><td>" + ttot_.toLocaleString() + "</td>");
      thome_ = this.Ram_home;
      ttot_ = this.Ram_total;
      ramstot_ = ramstot_ + ttot_;
      tshome_ = tshome_ + 10 * thome_;
      tstot_ = tstot_ + 10 * ttot_;
      /** @type {string} */
      troopstab_ = troopstab_ + ("<td>" + thome_.toLocaleString() + "</td><td>" + ttot_.toLocaleString() + "</td>");
      thome_ = this.Ranger_home;
      ttot_ = this.Ranger_total;
      rangerstot_ = rangerstot_ + ttot_;
      tshome_ = tshome_ + thome_;
      tstot_ = tstot_ + ttot_;
      /** @type {string} */
      troopstab_ = troopstab_ + ("<td>" + thome_.toLocaleString() + "</td><td>" + ttot_.toLocaleString() + "</td>");
      thome_ = this.Scorpion_home;
      ttot_ = this.Scorpion_total;
      scorptot_ = scorptot_ + ttot_;
      tshome_ = tshome_ + 10 * thome_;
      tstot_ = tstot_ + 10 * ttot_;
      /** @type {string} */
      troopstab_ = troopstab_ + ("<td>" + thome_.toLocaleString() + "</td><td>" + ttot_.toLocaleString() + "</td>");
      thome_ = this.Scout_home;
      ttot_ = this.Scout_total;
      scoutstot_ = scoutstot_ + ttot_;
      tshome_ = tshome_ + 2 * thome_;
      tstot_ = tstot_ + 2 * ttot_;
      /** @type {string} */
      troopstab_ = troopstab_ + ("<td>" + thome_.toLocaleString() + "</td><td>" + ttot_.toLocaleString() + "</td>");
      thome_ = this.Senator_home;
      ttot_ = this.Senator_total;
      senatortot_ = senatortot_ + ttot_;
      tshome_ = tshome_ + thome_;
      tstot_ = tstot_ + ttot_;
      /** @type {string} */
      troopstab_ = troopstab_ + ("<td>" + thome_.toLocaleString() + "</td><td>" + ttot_.toLocaleString() + "</td>");
      thome_ = this.Sorcerer_home;
      ttot_ = this.Sorcerer_total;
      sorctot_ = sorctot_ + ttot_;
      tshome_ = tshome_ + thome_;
      tstot_ = tstot_ + ttot_;
      /** @type {string} */
      troopstab_ = troopstab_ + ("<td>" + thome_.toLocaleString() + "</td><td>" + ttot_.toLocaleString() + "</td>");
      thome_ = this.Stinger_home;
      ttot_ = this.Stinger_total;
      stingerstot_ = stingerstot_ + ttot_;
      tshome_ = tshome_ + 100 * thome_;
      tstot_ = tstot_ + 100 * ttot_;
      /** @type {string} */
      troopstab_ = troopstab_ + ("<td>" + thome_.toLocaleString() + "</td><td>" + ttot_.toLocaleString() + "</td>");
      thome_ = this.Triari_home;
      ttot_ = this.Triari_total;
      triaritot_ = triaritot_ + ttot_;
      tshome_ = tshome_ + thome_;
      tstot_ = tstot_ + ttot_;
      /** @type {string} */
      troopstab_ = troopstab_ + ("<td>" + thome_.toLocaleString() + "</td><td>" + ttot_.toLocaleString() + "</td>");
      thome_ = this.Vanquisher_home;
      ttot_ = this.Vanquisher_total;
      vanqstot_ = vanqstot_ + ttot_;
      tshome_ = tshome_ + thome_;
      tstot_ = tstot_ + ttot_;
      /** @type {string} */
      troopstab_ = troopstab_ + ("<td>" + thome_.toLocaleString() + "</td><td>" + ttot_.toLocaleString() + "</td>");
      thome_ = this.Warship_home;
      ttot_ = this.Warship_total;
      warshipstot_ = warshipstot_ + ttot_;
      tshome_ = tshome_ + 400 * thome_;
      tstot_ = tstot_ + 400 * ttot_;
      /** @type {string} */
      troopstab_ = troopstab_ + ("<td>" + thome_.toLocaleString() + "</td><td>" + ttot_.toLocaleString() + "</td>");
      /** @type {string} */
      troopstab_ = troopstab_ + ("<td>" + tshome_.toLocaleString() + "</td><td>" + tstot_.toLocaleString() + "</td></tr>");
    });
    troopstab_ = troopstab_ + "</tbody>";
    $("#troopstable").html(troopstab_);
    $("#troopstable td").css("text-align", "center");
    $("#troopstable td").css("padding-left", "0%");
    /** @type {(Element|null)} */
    var newTableObject_7 = document.getElementById("troopstable");
    sorttable.makeSortable(newTableObject_7);
    /** @type {string} */
    var tottab_1 = "<div id='tsum' class='beigemenutable scroll-pane' style='width: 99%;margin-left: 4px;'><table style='font-size: 14px;width: 120%;'><tr><td>Total arbs: </td><td>Total balli: </td><td>Total druids: </td><td>Total galley: </td><td>Total guards: </td><td>Total horses: </td><td>Total praetor: </td><td>Total priest: </td><td>Total rams: </td><td>Total rangers: </td>";
    /** @type {string} */
    tottab_1 = tottab_1 + "<td>Total scorp: </td><td>Total scouts: </td><td>Total senator: </td><td>Total sorc: </td><td>Total stingers: </td><td>Total triari: </td><td>Total vanqs: </td><td>Total warship: </td></tr>";
    /** @type {string} */
    tottab_1 = tottab_1 + ("<tr><td>" + arbstot_.toLocaleString() + "</td><td>" + balltot_.toLocaleString() + "</td>");
    /** @type {string} */
    tottab_1 = tottab_1 + ("<td>" + druidstot_.toLocaleString() + "</td>");
    /** @type {string} */
    tottab_1 = tottab_1 + ("<td>" + galltot_.toLocaleString() + "</td>");
    /** @type {string} */
    tottab_1 = tottab_1 + ("<td>" + guardstot_.toLocaleString() + "</td>");
    /** @type {string} */
    tottab_1 = tottab_1 + ("<td>" + horsetot_.toLocaleString() + "</td>");
    /** @type {string} */
    tottab_1 = tottab_1 + ("<td>" + praetorstot_.toLocaleString() + "</td>");
    /** @type {string} */
    tottab_1 = tottab_1 + ("<td>" + priesttot_.toLocaleString() + "</td>");
    /** @type {string} */
    tottab_1 = tottab_1 + ("<td>" + ramstot_.toLocaleString() + "</td>");
    /** @type {string} */
    tottab_1 = tottab_1 + ("<td>" + rangerstot_.toLocaleString() + "</td>");
    /** @type {string} */
    tottab_1 = tottab_1 + ("<td>" + scorptot_.toLocaleString() + "</td>");
    /** @type {string} */
    tottab_1 = tottab_1 + ("<td>" + scoutstot_.toLocaleString() + "</td>");
    /** @type {string} */
    tottab_1 = tottab_1 + ("<td>" + senatortot_.toLocaleString() + "</td>");
    /** @type {string} */
    tottab_1 = tottab_1 + ("<td>" + sorctot_.toLocaleString() + "</td>");
    /** @type {string} */
    tottab_1 = tottab_1 + ("<td>" + stingerstot_.toLocaleString() + "</td>");
    /** @type {string} */
    tottab_1 = tottab_1 + ("<td>" + triaritot_.toLocaleString() + "</td>");
    /** @type {string} */
    tottab_1 = tottab_1 + ("<td>" + vanqstot_.toLocaleString() + "</td>");
    /** @type {string} */
    tottab_1 = tottab_1 + ("<td>" + warshipstot_.toLocaleString() + "</td></tr></table></div>");
    $("#tsum").remove();
    $("#troopsTab").append(tottab_1);
    $.each(data_46, function() {
      var aa_5 = this.id;
      $("#cnt" + aa_5).click(function() {
        $("#organiser").val("all").change();
        $("#cityDropdownMenu").val(aa_5).change();
      });
    });
  }
  /**
   * @return {undefined}
   */
  function hidecities_() {
    $("#shrineTab tr").each(function() {
      if ($(this).attr("data") == "city") {
        $(this).hide();
      }
    });
  }
  /**
   * @return {undefined}
   */
  function showcities_() {
    $("#shrineTab tr").each(function() {
      if ($(this).attr("data") == "city") {
        $(this).show();
      }
    });
  }
  /**
   * @return {undefined}
   */
  function updateshrine_() {
    /** @type {string} */
    var shrinetab_ = "<table id='shrineTab'><thead><th style='width:115px'>Change</th><th style='width:50px'>Chances</th><th>Distance</th><th>Player</th><th>City</th><th>Coords</th><th style='width:100px'>Alliance</th><th>score</th><th>Type</th></thead><tbody>";
    /** @type {number} */
    var ccounter_ = 0;
    /** @type {!Array} */
    var w_7 = [];
    /** @type {number} */
    var wtot_ = 0;
    var i_30;
    for (i_30 in shrinec_) {
      if (i_30 > 0) {
        var k_2 = splayers_.name.indexOf(shrinec_[i_30][1]);
        var j_8;
        for (j_8 in splayers_.cities[k_2]) {
          if (shrinec_[i_30][3] == splayers_.cities[k_2][j_8].b && shrinec_[i_30][4] == splayers_.cities[k_2][j_8].c) {
            shrinec_[i_30][2] = splayers_.cities[k_2][j_8].h;
            if (shrinec_[i_30][9] == 0) {
              shrinec_[i_30][7] = splayers_.cities[k_2][j_8].a;
            }
            shrinec_[i_30][8] = splayers_.ally[k_2];
          }
        }
        if (shrinec_[i_30][0] == "castle") {
          ccounter_++;
          if (ccounter_ < 17) {
            /** @type {number} */
            w_7[ccounter_] = shrinec_[i_30][7] / shrinec_[i_30][5];
            /** @type {number} */
            wtot_ = wtot_ + shrinec_[i_30][7] / shrinec_[i_30][5];
          }
        }
      }
    }
    for (i_30 in w_7) {
      /** @type {number} */
      w_7[i_30] = Math.round(w_7[i_30] / wtot_ * 100);
    }
    /** @type {number} */
    ccounter_ = 0;
    for (i_30 in shrinec_) {
      if (i_30 > 0) {
        /** @type {number} */
        var cid_5 = shrinec_[i_30][4] * 65536 + Number(shrinec_[i_30][3]);
        if (shrinec_[i_30][0] == "castle") {
          ccounter_++;
          if (ccounter_ < 17) {
            if (shrinec_[i_30][6] == "0") {
              /** @type {string} */
              shrinetab_ = shrinetab_ + ("<tr style='color:purple;'><td><button data='" + i_30 + "' class='greenb shrineremove' style='font-size: 10px;height: 20px;padding: 3px;width: 15px;border-radius: 4px;'>x</button>");
              /** @type {string} */
              shrinetab_ = shrinetab_ + ("<button id='" + i_30 + "' data='castle' class='greenb shrinechange' style='font-size: 10px;height: 20px;padding-top: 3px;border-radius: 4px;'>City</button>");
              /** @type {string} */
              shrinetab_ = shrinetab_ + ("<button data='" + i_30 + "' class='greenb shrine10k' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>10k</button>");
              /** @type {string} */
              shrinetab_ = shrinetab_ + ("<button data='" + i_30 + "' class='greenb shrine7pt' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>7pt</button></td><td>" + ccounter_ + " - " + w_7[ccounter_] + "% " + "</td>");
            } else {
              /** @type {string} */
              shrinetab_ = shrinetab_ + ("<tr style='color:green;'><td><button data='" + i_30 + "' class='greenb shrineremove' style='font-size: 10px;height: 20px;padding: 3px;width: 15px;border-radius: 4px;'>x</button>");
              /** @type {string} */
              shrinetab_ = shrinetab_ + ("<button id='" + i_30 + "' data='castle' class='greenb shrinechange' style='font-size: 10px;height: 20px;padding-top: 3px;border-radius: 4px;'>City</button>");
              /** @type {string} */
              shrinetab_ = shrinetab_ + ("<button data='" + i_30 + "' class='greenb shrine10k' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>10k</button>");
              /** @type {string} */
              shrinetab_ = shrinetab_ + ("<button data='" + i_30 + "' class='greenb shrine7pt' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>7pt</button></td><td>" + ccounter_ + " - " + w_7[ccounter_] + "% " + "</td>");
            }
          } else {
            if (ccounter_ >= 17 && ccounter_ < 21) {
              /** @type {string} */
              shrinetab_ = shrinetab_ + ("<tr><td><button data='" + i_30 + "' class='greenb shrineremove' style='font-size: 10px;height: 20px;padding: 3px;width: 15px;border-radius: 4px;'>x</button>");
              /** @type {string} */
              shrinetab_ = shrinetab_ + ("<button id='" + i_30 + "' data='castle' class='greenb shrinechange' style='font-size: 10px;height: 20px;padding-top: 3px;border-radius: 4px;'>City</button>");
              /** @type {string} */
              shrinetab_ = shrinetab_ + ("<button data='" + i_30 + "' class='greenb shrine10k' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>10k</button>");
              /** @type {string} */
              shrinetab_ = shrinetab_ + ("<button data='" + i_30 + "' class='greenb shrine7pt' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>7pt</button></td><td>" + ccounter_ + "</td>");
            }
          }
        } else {
          if (shrinec_[i_30][6] == "0") {
            /** @type {string} */
            shrinetab_ = shrinetab_ + ("<tr style='color:grey;' data='city'><td><button data='" + i_30 + "' class='greenb shrineremove' style='font-size: 10px;height: 20px;padding: 3px;width: 15px;border-radius: 4px;'>x</button>");
            /** @type {string} */
            shrinetab_ = shrinetab_ + ("<button id='" + i_30 + "' data='city' class='greenb shrinechange' style='font-size: 10px;height: 20px;padding: 3px;border-radius: 4px;width:37px;'>Castle</button>");
            /** @type {string} */
            shrinetab_ = shrinetab_ + ("<button data='" + i_30 + "' class='greenb shrine10k' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>10k</button>");
            /** @type {string} */
            shrinetab_ = shrinetab_ + ("<button data='" + i_30 + "' class='greenb shrine7pt' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>7pt</button></td><td></td>");
          } else {
            /** @type {string} */
            shrinetab_ = shrinetab_ + ("<tr style='color:#74A274;'><td><button data='" + i_30 + "' class='greenb shrineremove' style='font-size: 10px;height: 20px;padding: 3px;width: 15px;border-radius: 4px;'>x</button>");
            /** @type {string} */
            shrinetab_ = shrinetab_ + ("<button id='" + i_30 + "' data='city' class='greenb shrinechange' style='font-size: 10px;height: 20px;padding: 3px;border-radius: 4px;width:37px;'>Castle</button>");
            /** @type {string} */
            shrinetab_ = shrinetab_ + ("<button data='" + i_30 + "' class='greenb shrine10k' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>10k</button>");
            /** @type {string} */
            shrinetab_ = shrinetab_ + ("<button data='" + i_30 + "' class='greenb shrine7pt' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>7pt</button></td><td></td>");
          }
        }
        /** @type {string} */
        shrinetab_ = shrinetab_ + ("<td>" + roundToTwo_(shrinec_[i_30][5]) + "</td><td class='playerblink'>" + shrinec_[i_30][1] + "</td><td>" + shrinec_[i_30][2] + "</td><td class='coordblink shcitt' data='" + cid_5 + "'>" + shrinec_[i_30][3] + ":" + shrinec_[i_30][4] + "</td><td class='allyblink'>" + shrinec_[i_30][8] + "</td><td>" + shrinec_[i_30][7] + "</td><td>" + shrinec_[i_30][0] + "</td></tr>");
        if (ccounter_ == 20) {
          break;
        }
      }
    }
    /** @type {string} */
    shrinetab_ = shrinetab_ + "</tbody></table>";
    $("#shrinediv").html(shrinetab_);
    $("#shrineTab td").css("text-align", "center");
    if (localStorage.getItem("hidecities") == "1") {
      hidecities_();
    }
    $(".shrinechange").click(function() {
      if ($(this).attr("data") == "castle") {
        /** @type {string} */
        shrinec_[$(this).attr("id")][0] = "city";
      } else {
        /** @type {string} */
        shrinec_[$(this).attr("id")][0] = "castle";
      }
      if (shrinec_[$(this).attr("id")][6] == "0") {
        /** @type {number} */
        shrinec_[$(this).attr("id")][6] = 1;
      } else {
        /** @type {number} */
        shrinec_[$(this).attr("id")][6] = 0;
      }
      updateshrine_();
    });
    $(".shrineremove").click(function() {
      shrinec_.splice($(this).attr("data"), 1);
      updateshrine_();
    });
    $(".shrine7pt").click(function() {
      if (shrinec_[$(this).attr("data")][7] != 7) {
        /** @type {number} */
        shrinec_[$(this).attr("data")][7] = 7;
        /** @type {number} */
        shrinec_[$(this).attr("data")][9] = 1;
        /** @type {number} */
        shrinec_[$(this).attr("data")][6] = 1;
      } else {
        /** @type {number} */
        shrinec_[$(this).attr("data")][9] = 0;
        /** @type {number} */
        shrinec_[$(this).attr("data")][6] = 0;
      }
      updateshrine_();
    });
    $(".shrine10k").click(function() {
      if (shrinec_[$(this).attr("data")][7] != 10000) {
        /** @type {number} */
        shrinec_[$(this).attr("data")][7] = 10000;
        /** @type {number} */
        shrinec_[$(this).attr("data")][9] = 1;
        /** @type {number} */
        shrinec_[$(this).attr("data")][6] = 1;
      } else {
        /** @type {number} */
        shrinec_[$(this).attr("data")][9] = 0;
        /** @type {number} */
        shrinec_[$(this).attr("data")][6] = 0;
      }
      updateshrine_();
    });
  }
  /**
   * @param {!Object} $table_
   * @param {string} filename_
   * @return {undefined}
   */
  function exportTableToCSV_($table_, filename_) {
    /**
     * @param {!Object} rows_
     * @return {?}
     */
    function formatRows_(rows_) {
      return rows_.get().join(tmpRowDelim_).split(tmpRowDelim_).join(rowDelim_).split(tmpColDelim_).join(colDelim_);
    }
    /**
     * @param {?} i_31
     * @param {?} row_
     * @return {?}
     */
    function grabRow_(i_31, row_) {
      var $row_ = $(row_);
      var $cols_ = $row_.find("td");
      if (!$cols_.length) {
        $cols_ = $row_.find("th");
      }
      return $cols_.map(grabCol_).get().join(tmpColDelim_);
    }
    /**
     * @param {?} j_9
     * @param {?} col_
     * @return {?}
     */
    function grabCol_(j_9, col_) {
      var $col_ = $(col_);
      var $text_ = $col_.text();
      return $text_.replace('"', '""');
    }
    var $headers_ = $table_.find("tr:has(th)");
    var $rows_ = $table_.find("tr:has(td)");
    /** @type {string} */
    var tmpColDelim_ = String.fromCharCode(11);
    /** @type {string} */
    var tmpRowDelim_ = String.fromCharCode(0);
    /** @type {string} */
    var colDelim_ = '","';
    /** @type {string} */
    var rowDelim_ = '"\r\n"';
    /** @type {string} */
    var csv_ = '"';
    /** @type {string} */
    csv_ = csv_ + formatRows_($headers_.map(grabRow_));
    /** @type {string} */
    csv_ = csv_ + rowDelim_;
    /** @type {string} */
    csv_ = csv_ + (formatRows_($rows_.map(grabRow_)) + '"');
    /** @type {string} */
    var csvData_ = "data:application/csv;charset=utf-8," + encodeURIComponent(csv_);
    $(this).attr({
      "download" : filename_,
      "href" : csvData_
    });
  }
  $(document).ready(function() {
    /** @type {string} */
      var popwin_ = `<div id='HelloWorld' style='width:400px;height:400px;background-color: #E2CBAC;-moz-border-radius: 10px;-webkit-border-radius: 10px;border-radius: 10px;border: 4px ridge #DAA520;position:absolute;right:40%;top:100px; z-index:1000000;'><div class=\"popUpBar\"> <span class=\"ppspan\">Welcome!</span><button id=\"cfunkyX\" onclick=\"$('#HelloWorld').remove();\" class=\"xbutton greenb\"><div id=\"xbuttondiv\"><div><div id=\"centxbuttondiv\"></div></div></div></button></div><div id='hellobody' class=\"popUpWindow\"><span style='margin-left: 5%;'> <h3 style='text-align:center;'>Welcome to Crown Of The Gods!</h3></span><br><br><span style='margin-left: 5%;'> <h4 style='text-align:center;'> MFunky(Cfunky + Dfunky + Mohnki's Additional Layouts + Avatar's nonsense)</h4></span><br><span style='margin-left: 5%;'> <h4 style='text-align:center;'>Updated Mar 1 2020</h4></span><br><br><span style='margin-left: 5%;'><h4>changes:</h4> <ul style='margin-left: 6%;'><li>Added 4 raiding carry percentages(100..125)</li><li>When you click on one, it will ensure that carry is at least that value and it will set it as the initial value for the next city that you go to</li></ul></span></div></div>`;

    $("body").append(popwin_);
    setTimeout(function() {
      var options_13 = {};
      $("#HelloWorld").hide("drop", options_13, 2000);
    }, 5000);
  });
  /** @type {!Array} */
  var ttts_ = [1, 10, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 10, 10, 100, 100, 400, 1];
  var citytc_;
  /** @type {string} */
  var message_23 = "Not enough TS to kill this boss!";
  /** @type {!Array} */
  var other_loot_ = [350, 1000, 4270, 15500, 32300, 56900, 117200, 198500, 297500, 441600];
  /** @type {!Array} */
  var mountain_loot_ = [350, 960, 4100, 14900, 31000, 54500, 112500, 190500, 285500, 423500];
  /** @type {!Array} */
  var tpicdiv_ = ["guard32 trooptdcm", "bally32 trooptdcm", "ranger32 trooptdcm", "triari32 trooptdcm", "priest32 trooptdcm", "vanq32 trooptdcm", "sorc32 trooptdcm", "scout32 trooptdcm", "arbal32 trooptdcm", "praet32 trooptdcm", "horsem32 trooptdcm", "druid32 trooptdcm", "ram32 trooptdcm", "scorp32 trooptdcm", "galley32 trooptdcm", "sting32 trooptdcm", "wship32 trooptdcm", "senat32 trooptdcm"];
  /** @type {!Array} */
  var tpicdiv20_ = ["guard20 trooptdcm", "bally20 trooptdcm", "ranger20 trooptdcm", "triari20 trooptdcm", "priest20 trooptdcm", "vanq20 trooptdcm", "sorc20 trooptdcm", "scout20 trooptdcm", "arbal20 trooptdcm", "praet20 trooptdcm", "horsem20 trooptdcm", "druid20 trooptdcm", "ram20 trooptdcm", "scorp20 trooptdcm", "galley20 trooptdcm", "sting20 trooptdcm", "wship20 trooptdcm", "senat20 trooptdcm"];
  /** @type {!Array} */
  var ttspeed_ = [0, 30, 20, 20, 20, 20, 20, 8, 10, 10, 10, 10, 30, 30, 5, 5, 5, 40];
  /** @type {!Array} */
  var ttres_ = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  /** @type {number} */
  var ibriafaith_ = 0;
  /** @type {number} */
  var ylannafaith_ = 0;
  /** @type {number} */
  var naerafaith_ = 0;
  /** @type {number} */
  var cyndrosfaith_ = 0;
  /** @type {number} */
  var domdisfaith_ = 0;
  /** @type {number} */
  var vexifaith_ = 0;
  /** @type {number} */
  var meriusfaith_ = 0;
  /** @type {number} */
  var evarafaith_ = 0;
  /** @type {!Array} */
  var ttspeedres_ = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  /** @type {!Array} */
  var TS_type_ = [0, 0, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 0, 0, 0, 100, 400];
  /** @type {!Array} */
  var Total_Combat_Research_ = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  /** @type {number} */
  var naera_ = 0;
  /** @type {number} */
  var vexemis_ = 0;
  /** @type {number} */
  var cyndros_ = 0;
  /** @type {number} */
  var ylanna_ = 0;
  var buildings_ = {
    name : ["forester", "cottage", "storehouse", "quarry", "hideaway", "farmhouse", "cityguardhouse", "barracks", "mine", "trainingground", "marketplace", "townhouse", "sawmill", "stable", "stonemason", "mage_tower", "windmill", "temple", "smelter", "blacksmith", "castle", "port", "port", "port", "shipyard", "shipyard", "shipyard", "townhall", "castle"],
    bid : [448, 446, 464, 461, 479, 447, 504, 445, 465, 483, 449, 481, 460, 466, 462, 500, 463, 482, 477, 502, "467", 488, 489, 490, 491, 496, 498, 455, 467]
  };
  /** @type {boolean} */
  var sum_ = true;
  /** @type {boolean} */
  var bdcountshow_ = true;
  /** @type {!Array} */
  var bossdef_ = [625, 3750, 25000, 50000, 125000, 187500, 250000, 375000, 562500, 750000];
  /** @type {!Array} */
  var bossdefw_ = [425, 2500, 17000, 33000, 83000, 125000, 170000, 250000, 375000, 500000];
  /** @type {!Array} */
  var bossmts_ = [6, 20, 100, 500, 2000, 3500, 5000, 8000, 12000, 15000];
  /** @type {!Array} */
  var numbs_ = [0, 0, 0];
  /** @type {!Array} */
  var ttloot_ = [0, 0, 10, 20, 10, 10, 5, 0, 15, 20, 15, 10, 0, 0, 0, 1500, 3000];
  /** @type {!Array} */
  var ttattack_ = [10, 50, 30, 10, 25, 50, 70, 10, 40, 60, 90, 120, 50, 150, 3000, 1200, 12000];
  /** @type {!Array} */
  var iscav_ = [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0];
  /** @type {!Array} */
  var isinf_ = [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  /** @type {!Array} */
  var ismgc_ = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
  /** @type {!Array} */
  var isart_ = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1];
  /** @type {!Array} */
  var resbonus_ = [0, 0.01, 0.03, 0.06, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5];
  /** @type {!Array} */
  var Res_ = [0, 1, 3, 6, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  /** @type {!Array} */
  var ttname_ = ["Guards", "Ballistas", "Rangers", "Triari", "Priestess", "Vanquishers", "Sorcerers", "Scouts", "Arbalists", "Praetors", "Horsemans", "Druids", "Rams", "Scorpions", "Galleys", "Stingers", "Warships", "senator"];
  /** @type {!Array} */
  var layoutsl_ = [""];
  /** @type {!Array} */
  var layoutsw_ = [""];
  /** @type {!Array} */
  var layoutdf_ = [""];
  var cdata_;
  var wdata_;
  var pldata_;
  var pdata_;
  var poll2_;
  var clc_ = {};
  var oga_;
  var city_ = {
    cid : 0,
    x : 0,
    y : 0,
    th : [0],
    cont : 0
  };
  var bosses_ = {
    name : ["Cyclops", "Andar's Colosseum Challenge", "Dragon", "Romulus and Remus", "Gorgon", "GM Gordy", "Triton"],
    pic : ["cyclops32 mauto bostooltip tooltipstered", "andar32 mauto bostooltip tooltipstered", "dragon32 mauto bostooltip tooltipstered", "romrem32 mauto bostooltip tooltipstered", "gorgon32 mauto bostooltip tooltipstered", "gmgordy32 mauto bostooltip tooltipstered", "triton32 mauto bostooltip tooltipstered"]
  };
  var bossinfo_ = {
    x : [],
    y : [],
    lvl : [],
    data : [],
    name : [],
    cont : [],
    distance : []
  };
  /** @type {string} */
  var key_35 = "_`abcdefgh";
  /** @type {!Array} */
  var remarksl_ = [""];
  /** @type {!Array} */
  var remarksw_ = [""];
  /** @type {!Array} */
  var remarkdf_ = [""];
  /** @type {!Array} */
  var troopcounw_ = [[]];
  /** @type {!Array} */
  var troopcound_ = [[]];
  /** @type {!Array} */
  var troopcounl_ = [[]];
  /** @type {!Array} */
  var resw_ = [[]];
  /** @type {!Array} */
  var resd_ = [[]];
  /** @type {!Array} */
  var resl_ = [[]];
  /** @type {!Array} */
  var notesl_ = [""];
  /** @type {!Array} */
  var notesw_ = [""];
  /** @type {!Array} */
  var notedf_ = [""];
  /** @type {string} */
  var emptyspots_ = ",.;:#-T";
  /** @type {boolean} */
  var beentoworld_ = false;
  var splayers_ = {
    name : [],
    ally : [],
    cities : []
  };
  /** @type {!Array} */
  var shrinec_ = [[]];
  var buildingdata_;
  var coofz_;
  var coon_;
  $(document).ready(function() {
    setTimeout(function() {
      var a_5 = $("#organiser > option");
      var l_3 = a_5.length;
      /** @type {number} */
      var i_32 = 0;
      for (; i_32 < l_3; i_32++) {
        /** @type {string} */
        var temp_3 = String($(a_5[i_32]).attr("value"));
        $("#organiser").val(temp_3).change();
        /** @type {!Array} */
        console.log(clc_);
        console.log(temp_3);
        if(clc_ != null && temp_3 != null && cdata_.cg)
        {
          clc_[temp_3] = [];
          var tempcl_ = $("#cityDropdownMenu > option");
          var ll_ = tempcl_.length;
          if (cdata_.cg.indexOf(temp_3) > -1) {
            clc_[temp_3].push($(tempcl_[0]).attr("value"));
          }
          if (ll_ > 1) {
            /** @type {number} */
            var j_10 = 1;
            for (; j_10 < ll_; j_10++) {
              clc_[temp_3].push($(tempcl_[j_10]).attr("value"));
            }
          }
        }
        else
        {
         
        }
      }
      $("#organiser").val("all").change();
    }, 8000);
  });
  setTimeout(function() {
    (function(open_2) {
      /**
       * @param {string=} p0
       * @param {string=} p1
       * @param {(boolean|null)=} p2
       * @param {(null|string)=} p3
       * @param {(null|string)=} p4
       * @return {undefined}
       */
      XMLHttpRequest.prototype.open = function() {
        this.addEventListener("readystatechange", function() {
          if (this.readyState == 4) {
            var url_21 = this.responseURL;
            if (url_21.indexOf("gC.php") != -1) {
              /** @type {*} */
              cdata_ = JSON.parse(this.response);
              city_.cid = cdata_.cid;
              city_.th = cdata_.th;
              citytc_ = cdata_.th;
              buildingdata_ = cdata_.bd;
              /** @type {number} */
              city_.x = Number(city_.cid % 65536);
              /** @type {number} */
              city_.y = Number((city_.cid - city_.x) / 65536);
              /** @type {number} */
              city_.cont = Number(Math.floor(city_.x / 100) + 10 * Math.floor(city_.y / 100));
              city_.mo = cdata_.mo;
              setTimeout(function() {
                updateattack_();
                updatedef_();
              }, 2000);
              makebuildcount_();
              coonvalue_();
            }
            if (url_21.indexOf("gWrd.php") != -1) {
              /** @type {*} */
              wdata_ = JSON.parse(this.response);
              /** @type {boolean} */
              beentoworld_ = true;
              wdata_ = DecodeWorldData(wdata_.a);
              getbossinfo_();
            }
            if (url_21.indexOf("gPlA.php") != -1) {
              /** @type {*} */
              pldata_ = JSON.parse(this.response);
            }
            if (url_21.indexOf("poll2.php") != -1) {
              if (poll2_) {
                var saveclc_ = poll2_.player.clc;
                var saveoga_ = poll2_.OGA;
                clc_ = poll2_.player.clc;
              }
              /** @type {*} */
              poll2_ = JSON.parse(this.response);
              /** @type {number} */
              city_.x = Number(poll2_.city.cid % 65536);
              /** @type {number} */
              city_.y = Number((poll2_.city.cid - city_.x) / 65536);
              /** @type {number} */
              city_.cont = Number(Math.floor(city_.x / 100) + 10 * Math.floor(city_.y / 100));
              if ("OGA" in poll2_) {
              } else {
                poll2_.OGA = saveoga_;
              }
              if ("bd" in poll2_.city) {
                makebuildcount_();
              }
              if ("clc" in poll2_.player) {
                clc_ = poll2_.player.clc;

              } else {
                poll2_.player.clc = saveclc_;
              }
              if ($("#warcouncTabs").tabs("option", "active") == 2) {
                /** @type {string} */
                var idle_1 = "<table id='idleunits' class='beigetablescrollp'><tbody><tr><td style='text-align: center;'><span>Idle troops:</span></td>";
                var i_33;
                for (i_33 in poll2_.city.th) {
                  /** @type {!Array} */
                  var notallow_1 = [0, 1, 7, 12, 13];
                  if (notallow_1.indexOf(i_33) == -1) {
                    if (poll2_.city.th[i_33] > 0) {
                      /** @type {string} */
                      idle_1 = idle_1 + ("<td><div class='" + tpicdiv_[i_33] + "' style='text-align: right;'></div></td><td style='text-align: left;'><span id='thbr" + i_33 + "' style='text-align: left;'>" + poll2_.city.th[i_33] + "</span></td>");
                    }
                  }
                }
                /** @type {string} */
                idle_1 = idle_1 + "</tbody></table>";
                $("#idletroops").html(idle_1);
              }
            }
          }
        }, false);
        open_2.apply(this, arguments);
      };
    })(XMLHttpRequest.prototype.open);
  }, 4000);
  /** @type {number} */
  var errz_ = 0;
  /**
   * @param {?} index_54
   * @param {string} char_
   * @return {?}
   * @this {!String}
   */
  String.prototype.replaceAt = function(index_54, char_) {
    /** @type {!Array<string>} */
    var a_6 = this.split("");
    /** @type {string} */
    a_6[index_54] = char_;
    return a_6.join("");
  };
  /**
   * @return {?}
   * @this {!String}
   */
  String.prototype.decrypt = function() {
    /** @type {!String} */
    var a_7 = this;
    var i_34;
    for (i_34 in a_7) {
      var j_11;
      for (j_11 in key_35) {
        if (a_7.charAt(i_34) == key_35.charAt(j_11)) {
          a_7 = a_7.replaceAt(i_34, j_11);
        }
      }
    }
    return a_7;
  };
  $(document).ready(function() {
    /**
     * @param {?} ldata_2
     * @return {undefined}
     */
    function setloyal_1(ldata_2) {
      /** @type {number} */
      var faith_ = 0;
      $.each(ldata_2.t, function(key_47, value_95) {
        if (key_47 == 1) {
          $.each(this, function(key_48, value_96) {
            evarafaith_ = evarafaith_ + this.f;
          });
        }
        if (key_47 == 2) {
          $.each(this, function(key_49, value_97) {
            vexifaith_ = vexifaith_ + this.f;
          });
        }
        if (key_47 == 3) {
          $.each(this, function(key_50, value_98) {
            domdisfaith_ = domdisfaith_ + this.f;
          });
        }
        if (key_47 == 4) {
          $.each(this, function(key_51, value_99) {
            cyndrosfaith_ = cyndrosfaith_ + this.f;
          });
        }
        if (key_47 == 5) {
          $.each(this, function(key_52, value_100) {
            meriusfaith_ = meriusfaith_ + this.f;
          });
        }
        if (key_47 == 6) {
          $.each(this, function(key_53, value_101) {
            ylannafaith_ = ylannafaith_ + this.f;
          });
        }
        if (key_47 == 7) {
          $.each(this, function(key_54, value_102) {
            ibriafaith_ = ibriafaith_ + this.f;
          });
        }
        if (key_47 == 8) {
          $.each(this, function(key_55, value_103) {
            naerafaith_ = naerafaith_ + this.f;
          });
        }
      });
      /** @type {number} */
      ylannafaith_ = Math.min(ylannafaith_, 100);
      /** @type {number} */
      naerafaith_ = Math.min(naerafaith_, 100);
      /** @type {number} */
      vexifaith_ = Math.min(vexifaith_, 100);
      /** @type {number} */
      cyndrosfaith_ = Math.min(cyndrosfaith_, 100);
      /** @type {number} */
      domdisfaith_ = Math.min(domdisfaith_, 100);
      /** @type {number} */
      ibriafaith_ = Math.min(ibriafaith_, 100);
      /** @type {number} */
      evarafaith_ = Math.min(evarafaith_, 100);
      /** @type {number} */
      meriusfaith_ = Math.min(meriusfaith_, 100);
      var research_1 = cotg.player.research();
      setTimeout(function() {
        ttres_[0] += Number(naerafaith_) * 0.5 / 100 + Number(Res_[research_1[29]]) / 100;
        ttres_[1] += Number(naerafaith_) * 0.5 / 100 + Number(Res_[research_1[42]]) / 100;
        ttres_[2] += Number(naerafaith_) * 0.5 / 100 + Number(Res_[research_1[30]]) / 100;
        ttres_[3] += Number(naerafaith_) * 0.5 / 100 + Number(Res_[research_1[31]]) / 100;
        ttres_[4] += Number(naerafaith_) * 0.5 / 100 + Number(Res_[research_1[32]]) / 100;
        ttres_[5] += Number(vexifaith_) * 0.5 / 100 + Number(Res_[research_1[33]]) / 100;
        ttres_[6] += Number(vexifaith_) * 0.5 / 100 + Number(Res_[research_1[34]]) / 100;
        ttres_[7] += Number(vexifaith_) * 0.5 / 100 + Number(Res_[research_1[46]]) / 100;
        ttres_[8] += Number(naerafaith_) * 0.5 / 100 + Number(Res_[research_1[35]]) / 100;
        ttres_[9] += Number(naerafaith_) * 0.5 / 100 + Number(Res_[research_1[36]]) / 100;
        ttres_[10] += Number(vexifaith_) * 0.5 / 100 + Number(Res_[research_1[37]]) / 100;
        ttres_[11] += Number(vexifaith_) * 0.5 / 100 + Number(Res_[research_1[38]]) / 100;
        ttres_[12] += Number(cyndrosfaith_) * 0.5 / 100 + Number(Res_[research_1[39]]) / 100;
        ttres_[13] += Number(cyndrosfaith_) * 0.5 / 100 + Number(Res_[research_1[41]]) / 100;
        ttres_[14] += Number(ylannafaith_) * 0.5 / 100 + Number(Res_[research_1[44]]) / 100;
        ttres_[15] += Number(ylannafaith_) * 0.5 / 100 + Number(Res_[research_1[43]]) / 100;
        ttres_[16] += Number(cyndrosfaith_) * 0.5 / 100 + Number(Res_[research_1[45]]) / 100;
        ttspeedres_[1] += Number(domdisfaith_) * 0.5 / 100 + Number(Res_[research_1[12]]) / 100;
        ttspeedres_[2] += Number(ibriafaith_) * 0.5 / 100 + Number(Res_[research_1[8]]) / 100;
        ttspeedres_[3] += Number(ibriafaith_) * 0.5 / 100 + Number(Res_[research_1[8]]) / 100;
        ttspeedres_[4] += Number(ibriafaith_) * 0.5 / 100 + Number(Res_[research_1[8]]) / 100;
        ttspeedres_[5] += Number(ibriafaith_) * 0.5 / 100 + Number(Res_[research_1[8]]) / 100;
        ttspeedres_[6] += Number(ibriafaith_) * 0.5 / 100 + Number(Res_[research_1[8]]) / 100;
        ttspeedres_[7] += Number(ibriafaith_) * 0.5 / 100 + Number(Res_[research_1[11]]) / 100;
        ttspeedres_[8] += Number(ibriafaith_) * 0.5 / 100 + Number(Res_[research_1[9]]) / 100;
        ttspeedres_[9] += Number(ibriafaith_) * 0.5 / 100 + Number(Res_[research_1[9]]) / 100;
        ttspeedres_[10] += Number(ibriafaith_) * 0.5 / 100 + Number(Res_[research_1[9]]) / 100;
        ttspeedres_[11] += Number(ibriafaith_) * 0.5 / 100 + Number(Res_[research_1[9]]) / 100;
        ttspeedres_[12] += Number(domdisfaith_) * 0.5 / 100 + Number(Res_[research_1[12]]) / 100;
        ttspeedres_[13] += Number(domdisfaith_) * 0.5 / 100 + Number(Res_[research_1[12]]) / 100;
        ttspeedres_[14] += Number(domdisfaith_) * 0.5 / 100 + Number(Res_[research_1[13]]) / 100;
        ttspeedres_[15] += Number(domdisfaith_) * 0.5 / 100 + Number(Res_[research_1[13]]) / 100;
        ttspeedres_[16] += Number(domdisfaith_) * 0.5 / 100 + Number(Res_[research_1[13]]) / 100;
        ttspeedres_[17] += Number(domdisfaith_) * 0.5 / 100 + Number(Res_[research_1[14]]) / 100;
      }, 2000);
    }
    jQuery.ajax({
      url : "includes/gaLoy.php",
      type : "POST",
      aysnc : true,
      success : function success_8(data_47) {
        /** @type {*} */
        var ldata_3 = JSON.parse(data_47);
        setloyal_1(ldata_3);
      }
    });
    var reslvl_;
    jQuery.ajax({
      url : "includes/pD.php",
      type : "POST",
      aysnc : true,
      success : function success_9(data_48) {
        /** @type {*} */
        console.log(data_48);
        if(data_48 != "")
        {
          try {
            var __pData_ = JSON.parse(data_48);
            pdata_ = __pData_;
            
          } catch (e) {
            console.log(e);
          }
        }
        else
        {
          console.log("error");
        }
      }
    });
    setTimeout(function() {
      var cid_6 = $("#cityDropdownMenu").val();
      var dat_6 = {
        a : cid_6
      };
      jQuery.ajax({
        url : "includes/gC.php",
        type : "POST",
        aysnc : true,
        data : dat_6
      });
    }, 5000);
    /** @type {string} */
    var returnAllbut_ = "<button id='returnAllb' style='right: 35.6%; margin-top: 55px;width: 150px;height: 30px !important; font-size: 12px !important; position: absolute;' class='regButton greenb'>Return All</button>";
    /** @type {string} */
    var raidbossbut_ = "<button id='raidbossGo' style='left: 65%;margin-left: 10px;margin-top: 15px;width: 150px;height: 30px !important; font-size: 12px !important; position: absolute;' class='regButton greenb'>Locate Bosses</button>";
    /** @type {string} */
    var attackbut_ = "<button id='attackGo' style='margin-left: 25px;margin-top: 55px;width: 150px;height: 30px !important; font-size: 12px !important; position: absolute;' class='regButton greenb'>Attack Sender</button>";
    /** @type {string} */
    var defbut_ = "<button id='defGo' style='left: 65%;margin-left: 10px;margin-top: 55px;width: 150px;height: 30px !important; font-size: 12px !important; position: absolute;' class='regButton greenb'>Defense Sender</button>";
    /** @type {string} */
    var quickdefbut_ = "<button id='quickdefCityGo' style='width:96%; margin-top:2%; margin-left:2%;' class='regButton greenbuttonGo greenb'>@ Quick Reinforcements @</button>";
    /** @type {string} */
    var neardefbut_ = "<button id='ndefGo' style='left: 4%;margin-left: 3px;margin-top: 95px;width: 150px;height: 30px !important; font-size: 12px !important; position: absolute;' class='regButton greenb'> Nearest Defense</button>";
    /** @type {string} */
    var nearoffbut_ = "<button id='noffGo' style='right: 35.6%; margin-top: 95px;width: 150px;height: 30px !important; font-size: 12px !important; position: absolute;' class='regButton greenb'> Offensive list</button>";
    /** @type {string} */
    var addtoatt_ = "<button id='addtoAtt' style='margin-left: 7%;margin-top: -5%;width: 40%;height: 26px !important; font-size: 9px !important;' class='regButton greenb'>Add to Attack Sender</button>";
    /** @type {string} */
    var addtodef_ = "<button id='addtoDef' style='margin-left: 7%;width: 40%;height: 26px !important; font-size: 9px !important;' class='regButton greenb'>Add to Defense Sender</button>";
    /** @type {string} */
    var bosstab_ = "<li id='bosshuntab' class='ui-state-default ui-corner-top' role='tab' tabindex='-1' aria-controls='warBossmanager'";
    /** @type {string} */
    bosstab_ = bosstab_ + "aria-labeledby='ui-id-20' aria-selected='false' aria-expanded='false'>";
    /** @type {string} */
    bosstab_ = bosstab_ + "<a href='#warBossmanager' class='ui-tabs-anchor' role='presentation' tabindex='-1' id='ui-id-20'>Find Bosses</a></li>";
    /** @type {string} */
    var bosstabbody_ = "<div id='warBossmanager' aria-labeledby='ui-id-20' class='ui-tabs-panel ui-widget-content ui-corner-bottom' ";
    /** @type {string} */
    bosstabbody_ = bosstabbody_ + " role='tabpanel' aria-hidden='true' style='display: none;'><div id='fpdcdiv3' class='redheading' style='margin-left: 2%;' >CFunky's Boss Raiding tool:</div>";
    /** @type {string} */
    bosstabbody_ = bosstabbody_ + "<div id='bossbox' class='beigemenutable scroll-pane' style='width: 96%; height: 85%; margin-left: 2%;'></div>";
    /** @type {string} */
    bosstabbody_ = bosstabbody_ + "<div id='idletroops'></div></div>";
    /** @type {string} */
    var attacktab_ = "<li id='attacktab' class='ui-state-default ui-corner-top' role='tab' tabindex='-1' aria-controls='warAttackmanager'";
    /** @type {string} */
    attacktab_ = attacktab_ + "aria-labeledby='ui-id-21' aria-selected='false' aria-expanded='false'>";
    /** @type {string} */
    attacktab_ = attacktab_ + "<a href='#warAttackmanager' class='ui-tabs-anchor' role='presentation' tabindex='-1' id='ui-id-21'>Attack</a></li>";
    /** @type {string} */
    var attacktabbody_ = "<div id='warAttackmanager' aria-labeledby='ui-id-21' class='ui-tabs-panel ui-widget-content ui-corner-bottom' ";
    /** @type {string} */
    attacktabbody_ = attacktabbody_ + " role='tabpanel' aria-hidden='true' style='display: none;'><div id='fpdcdiv3' class='redheading' style='margin-left: 2%;' >Attack Sender:</div>";
    /** @type {string} */
    attacktabbody_ = attacktabbody_ + "<div id='attackbox' class='beigemenutable scroll-pane' style='width: 53%; height: 50%; float:left; margin-left: 1%; margin-right: 1%;'>";
    /** @type {string} */
    attacktabbody_ = attacktabbody_ + "<table><thead><th></th><th>X</th><th>Y</th><th>Type</th></thead><tbody>";
    /** @type {number} */
    var i_35 = 1;
    for (; i_35 < 16; i_35++) {
      /** @type {string} */
      attacktabbody_ = attacktabbody_ + ("<tr><td>Target " + i_35 + " </td><td><input id='t" + i_35 + "x' type='number' style='width: 85%'></td><td><input id='t" + i_35 + "y' type='number' style='width: 85%'></td>");
      /** @type {string} */
      attacktabbody_ = attacktabbody_ + ("<td><select id='type" + i_35 + "' class='greensel' style='font-size: 15px !important;width:95%;height:30px;'><option value='0'>Fake</option><option value='1'>Real</option></select></td></tr>");
    }
    /** @type {string} */
    attacktabbody_ = attacktabbody_ + "</tbody></table></div>";
    /** @type {string} */
    attacktabbody_ = attacktabbody_ + "<div id='picktype' class='beigemenutable scroll-pane' style='width: 43%; height: 50%;'></div>";
    /** @type {string} */
    attacktabbody_ = attacktabbody_ + "<table><tr><td><span>Use percentage of troops:</span></td><td><input id='perc' type='number' style='width: 30px'>%</td><td></td></tr>";
    /** @type {string} */
    attacktabbody_ = attacktabbody_ + "<tr><td><span>Send real as:</span></td><td><select id='realtype' class='greensel' style='font-size: 15px !important;width:95%;height:30px;'>";
    /** @type {string} */
    attacktabbody_ = attacktabbody_ + "<option value='0'>Assault</option><option value='1'>Siege</option><option value='2'>Plunder</option><option value='3'>Scout</option></select></td><td></td></tr>";
    /** @type {string} */
    attacktabbody_ = attacktabbody_ + "<tr><td><span>Send fake as:</span></td><td><select id='faketype' class='greensel' style='font-size: 15px !important;width:95%;height:30px;'>";
    /** @type {string} */
    attacktabbody_ = attacktabbody_ + "<option value='0'>Assault</option><option value='1'>Siege</option><option value='2'>Plunder</option><option value='3'>Scout</option></select></td><td></td></tr>";
    /** @type {string} */
    attacktabbody_ = attacktabbody_ + "<tr><td><input id='retcheck' class='clsubopti' type='checkbox' checked> Return all Troops</td><td colspan=2><input id='retHr' type='number' style='width: 20px' value='2'> Hours before attack</td></tr>";
    /** @type {string} */
    attacktabbody_ = attacktabbody_ + "<tr><td><input id='scoutick' class='clsubopti' type='checkbox' checked>30galleys/1scout fake</td></tr></table>";
    /** @type {string} */
    attacktabbody_ = attacktabbody_ + "<table style='width:96%;margin-left:2%'><thead><tr style='text-align:center;'><th></th><th>Hr</th><th>Min</th><th>Sec</th><th colspan='2'>Date</th></tr>";
    /** @type {string} */
    attacktabbody_ = attacktabbody_ + "<tr><td>Set Time: </td><td><input id='attackHr' type='number' style='width: 35px;height: 22px;font-size: 10px;' value='10'></td><td><input id='attackMin' style='width: 35px;height: 22px;font-size: 10px;' type='number' value='00'></td>";
    /** @type {string} */
    attacktabbody_ = attacktabbody_ + "<td><input style='width: 35px;height: 22px;font-size: 10px;' id='attackSec' type='number' value='00'></td><td colspan='2'><input style='width:90px;' id='attackDat' type='text' value='00/00/0000'></td></tr></tbody></table>";
    /** @type {string} */
    attacktabbody_ = attacktabbody_ + "<table style='margin-left: 10%; margin-top:20px;'><tbody><tr><td style='width: 20%'><button id='Attack' style='width: 95%;height: 30px !important; font-size: 12px !important;' class='regButton greenb'>Attack!</button></td>";
    /** @type {string} */
    attacktabbody_ = attacktabbody_ + "<td style='width: 20%'><button id='Aexport' style='width: 95%;height: 30px !important; font-size: 12px !important;' class='regButton greenb'>Export Order</button></td>";
    /** @type {string} */
    attacktabbody_ = attacktabbody_ + "<td style='width: 20%'><button id='Aimport' style='width: 95%;height: 30px !important; font-size: 12px !important;' class='regButton greenb'>Import Order</button></td></tr></tbody></table>";
    /** @type {string} */
    var deftab_ = "<li id='deftab' class='ui-state-default ui-corner-top' role='tab' tabindex='-1' aria-controls='warDefmanager'";
    /** @type {string} */
    deftab_ = deftab_ + "aria-labeledby='ui-id-22' aria-selected='false' aria-expanded='false'>";
    /** @type {string} */
    deftab_ = deftab_ + "<a href='#warDefmanager' class='ui-tabs-anchor' role='presentation' tabindex='-1' id='ui-id-22'>Defend</a></li>";
    /** @type {string} */
    var deftabbbody_ = "<div id='warDefmanager' aria-labeledby='ui-id-21' class='ui-tabs-panel ui-widget-content ui-corner-bottom' ";
    /** @type {string} */
    deftabbbody_ = deftabbbody_ + " role='tabpanel' aria-hidden='true' style='display: none;'><div id='fpdcdiv3' class='redheading' style='margin-left: 2%;' >Defense Sender:</div>";
    /** @type {string} */
    deftabbbody_ = deftabbbody_ + "<div><p style='font-size: 10px;'>Defense sender will split all the troops you choose to send according to the number of targets you input.</p></div>";
    /** @type {string} */
    deftabbbody_ = deftabbbody_ + "<div id='defbox' class='beigemenutable scroll-pane' style='width: 53%; height: 50%; float:left; margin-left: 1%; margin-right: 1%;'>";
    /** @type {string} */
    deftabbbody_ = deftabbbody_ + "<table><thead><th></th><th>X</th><th>Y</th></thead><tbody>";
    /** @type {number} */
    i_35 = 1;
    for (; i_35 < 15; i_35++) {
      /** @type {string} */
      deftabbbody_ = deftabbbody_ + ("<tr><td>Target " + i_35 + " </td><td><input id='d" + i_35 + "x' type='number' style='width: 85%'></td><td><input id='d" + i_35 + "y' type='number' style='width: 85%'></td></tr>");
    }
    /** @type {string} */
    deftabbbody_ = deftabbbody_ + "</tbody></table></div>";
    /** @type {string} */
    deftabbbody_ = deftabbbody_ + "<div id='dpicktype' class='beigemenutable scroll-pane' style='width: 43%; height: 50%;'></div>";
    /** @type {string} */
    deftabbbody_ = deftabbbody_ + "<table><tr><td><span>Use percentage of troops:</span></td><td><input id='defperc' type='number' style='width: 30px'>%</td><td></td></tr>";
    /** @type {string} */
    deftabbbody_ = deftabbbody_ + "<tr><td><span>Select Departure:</span></td><td><select id='defdeparture' class='greensel' style='font-size: 15px !important;width:95%;height:30px;'>";
    /** @type {string} */
    deftabbbody_ = deftabbbody_ + "<option value='0'>Now</option><option value='1'>Departure time</option><option value='2'>Arrival time</option></select></td><td></td></tr>";
    /** @type {string} */
    deftabbbody_ = deftabbbody_ + "<tr id='dret'><td><input id='dretcheck' class='clsubopti' type='checkbox' checked> Return all Troops</td><td colspan=2><input id='dretHr' type='number' style='width: 20px' value='2'> Hours before departure</td></tr></table>";
    /** @type {string} */
    deftabbbody_ = deftabbbody_ + "<table id='deftime' style='width:96%;margin-left:2%'><thead><tr style='text-align:center;'><th></th><th>Hr</th><th>Min</th><th>Sec</th><th colspan='2'>Date</th></tr>";
    /** @type {string} */
    deftabbbody_ = deftabbbody_ + "<tr><td>Set Time: </td><td><input id='defHr' type='number' style='width: 35px;height: 22px;font-size: 10px;' value='10'></td><td><input id='defMin' style='width: 35px;height: 22px;font-size: 10px;' type='number' value='00'></td>";
    /** @type {string} */
    deftabbbody_ = deftabbbody_ + "<td><input style='width: 35px;height: 22px;font-size: 10px;' id='defSec' type='number' value='00'></td><td colspan='2'><input style='width:90px;' id='defDat' type='text' value='00/00/0000'></td></tr></tbody></table>";
    /** @type {string} */
    deftabbbody_ = deftabbbody_ + "<button id='Defend' style='width: 35%;height: 30px; font-size: 12px; margin:10px;' class='regButton greenb'>Send Defense</button>";
    /** @type {string} */
    var ndeftab_ = "<li id='neardeftab' class='ui-state-default ui-corner-top' role='tab'>";
    /** @type {string} */
    ndeftab_ = ndeftab_ + "<a href='#warNdefmanager' class='ui-tabs-anchor' role='presentation'>Near Def</a></li>";
    /** @type {string} */
    var ndeftabbody_ = "<div id='warNdefmanager' class='ui-tabs-panel ui-widget-content ui-corner-bottom' ";
    /** @type {string} */
    ndeftabbody_ = ndeftabbody_ + " role='tabpanel' style='display: none;'><div id='fpdcdiv3' class='redheading' style='margin-left: 2%;' >Nearest defense:</div>";
    /** @type {string} */
    ndeftabbody_ = ndeftabbody_ + "<table><td>Choose city:</td><td><input style='width: 30px;height: 22px;font-size: 10px;' id='ndefx' type='number'> : <input style='width: 30px;height: 22px;font-size: 10px;' id='ndefy' type='number'></td>";
    /** @type {string} */
    ndeftabbody_ = ndeftabbody_ + "<td>Showing For:</td><td id='asdfgh' class='coordblink shcitt'></td>";
    /** @type {string} */
    ndeftabbody_ = ndeftabbody_ + "<td><button class='regButton greenb' id='ndefup' style='height:30px; width:70px;'>Update</button></td></table>";
    /** @type {string} */
    ndeftabbody_ = ndeftabbody_ + "<div id='Ndefbox' class='beigemenutable scroll-pane' style='width: 96%; height: 85%; margin-left: 2%;'></div>";
    /** @type {string} */
    var nofftab_ = "<li id='nearofftab' class='ui-state-default ui-corner-top' role='tab'>";
    /** @type {string} */
    nofftab_ = nofftab_ + "<a href='#warNoffmanager' class='ui-tabs-anchor' role='presentation'>Offensive TS</a></li>";
    /** @type {string} */
    var nofftabbody_ = "<div id='warNoffmanager' class='ui-tabs-panel ui-widget-content ui-corner-bottom' ";
    /** @type {string} */
    nofftabbody_ = nofftabbody_ + " role='tabpanel' style='display: none;'><div id='fpdcdiv3' class='redheading' style='margin-left: 2%;' >ALL Offensive TS:</div>";
    /** @type {string} */
    nofftabbody_ = nofftabbody_ + "<table><td colspan='2'> Continent(99 for navy):</td><td><input style='width: 30px;height: 22px;font-size: 10px;' id='noffx' type='number' value='0'>";
    /** @type {string} */
    nofftabbody_ = nofftabbody_ + "<td><button class='regButton greenb' id='noffup' style='height:30px; width:70px;'>Update</button></td>";
    /** @type {string} */
    nofftabbody_ = nofftabbody_ + "<td id='asdfg' style='width:10% !important;'></td><td><button class='regButton greenb' id='mailoff' style='height:30px; width:50px;'>Mail</button></td><td><input style='width: 100px;height: 22px;font-size: 10px;' id='mailname' type='text' value='Name_here;'></table>";
    /** @type {string} */
    nofftabbody_ = nofftabbody_ + "<div id='Noffbox' class='beigemenutable scroll-pane' style='width: 96%; height: 85%; margin-left: 2%;'></div>";
    /** @type {string} */
    var expwin_ = "<div id='ExpImp' style='width:250px;height:200px;' class='popUpBox ui-draggable'><div class=\"popUpBar\"><span class=\"ppspan\">Import/Export attack orders</span>";
    /** @type {string} */
    expwin_ = expwin_ + '<button id="cfunkyX" onclick="$(\'#ExpImp\').remove();" class="xbutton greenb"><div id="xbuttondiv"><div><div id="centxbuttondiv"></div></div></div></button></div><div id=\'expbody\' class="popUpWindow">';
    /** @type {string} */
    expwin_ = expwin_ + "<textarea style='font-size:11px;width:97%;margin-left:1%;height:17%;' id='expstring' maxlength='200'></textarea><button id='applyExp' style='margin-left: 15px; width: 100px;height: 30px !important; font-size: 12px !important;' class='regButton greenb'>Apply</button></div></div>";
    var tabs_ = $("#warcouncTabs").tabs();
    var ul_ = tabs_.find("ul");
    $(bosstab_).appendTo(ul_);
    $(attacktab_).appendTo(ul_);
    $(deftab_).appendTo(ul_);
    $(ndeftab_).appendTo(ul_);
    $(nofftab_).appendTo(ul_);
    tabs_.tabs("refresh");
    $("#warCidlemanager").after(bosstabbody_);
    $("#warCidlemanager").after(attacktabbody_);
    $("#warAttackmanager").after(deftabbbody_);
    $("#warDefmanager").after(ndeftabbody_);
    $("#warNdefmanager").after(nofftabbody_);
    $("#senddefCityGo").after(quickdefbut_);
    $("#deftime").hide();
    $("#dret").hide();
    $("#warCounc").append(returnAllbut_);
    $("#warCounc").append(attackbut_);
    $("#warCounc").append(defbut_);
    $("#warCounc").append(neardefbut_);
    $("#warCounc").append(nearoffbut_);
    $("#coordstochatGo1").after(addtoatt_);
    $("#addtoAtt").after(addtodef_);
    $("#loccavwarconGo").css("right", "65%");
    $("#idluniwarconGo").css("left", "34%");
    $("#idluniwarconGo").after(raidbossbut_);
    $("#defdeparture").change(function() {
      if ($("#defdeparture").val() == 0) {
        $("#deftime").hide();
        $("#dret").hide();
      } else {
        $("#deftime").show();
        $("#dret").show();
      }
    });
    if (localStorage.getItem("attperc")) {
      $("#perc").val(localStorage.getItem("attperc"));
    } else {
      $("#perc").val(99);
    }
    if (localStorage.getItem("defperc")) {
      $("#defperc").val(localStorage.getItem("defperc"));
    } else {
      $("#defperc").val(99);
    }
    if (localStorage.getItem("retcheck")) {
      if (localStorage.getItem("retcheck") == 1) {
        $("#retcheck").prop("checked", true);
      }
      if (localStorage.getItem("retcheck") == 0) {
        $("#retcheck").prop("checked", false);
      }
    }
    if (localStorage.getItem("dretcheck")) {
      if (localStorage.getItem("rdetcheck") == 1) {
        $("#dretcheck").prop("checked", true);
      }
      if (localStorage.getItem("dretcheck") == 0) {
        $("#dretcheck").prop("checked", false);
      }
    }
    if (localStorage.getItem("retHr")) {
      $("#retHr").val(localStorage.getItem("retHr"));
    }
    if (localStorage.getItem("dretHr")) {
      $("#dretHr").val(localStorage.getItem("dretHr"));
    }
    $("#attackDat").datepicker();
    $("#defDat").datepicker();
    $("#bosshuntab").click(function() {
      if (beentoworld_) {
        openbosswin_();
      } else {
        alert("Press World Button");
      }
    });
    $("#returnAllb").click(function() {
      jQuery.ajax({
        url : "includes/gIDl.php",
        type : "POST",
        async: false,
        success : function success_10(data_49) {
          /** @type {*} */
          var thdata_ = JSON.parse(data_49);
          $("#returnAll").remove();
          openreturnwin_(thdata_);
        }
      });
    });
    $("#raidbossGo").click(function() {
      if (beentoworld_) {
        $("#warcouncbox").show();
        tabs_.tabs("option", "active", 2);
        $("#bosshuntab").click();
      } else {
        alert("Press World Button");
      }
    });
    $("#Attack").click(function() {
      localStorage.setItem("attperc", $("#perc").val());
      localStorage.setItem("retHr", $("#retHr").val());
      if ($("#retcheck").prop("checked") == true) {
        localStorage.setItem("retcheck", 1);
      }
      if ($("#retcheck").prop("checked") == false) {
        localStorage.setItem("retcheck", 0);
      }
      SendAttack_();
    });
    $("#Defend").click(function() {
      localStorage.setItem("defperc", $("#defperc").val());
      localStorage.setItem("dretHr", $("#dretHr").val());
      var defobj_1 = {
        targets : {
          x : [],
          y : [],
          dist : [],
          numb : 0,
          cstr : []
        },
        t : {
          tot : [],
          home : [],
          type : [],
          use : [],
          speed : [],
          amount : []
        },
        perc : $("#defperc").val(),
        dep : $("#defdeparture").val(),
        ret : 1,
        rettime : $("#dretHr").val(),
        hr : $("#defHr").val(),
        min : $("#defMin").val(),
        sec : $("#defSec").val(),
        date : $("#defDat").val(),
        dat : $("#defDat").datepicker("getDate")
      };
      if ($("#dretcheck").prop("checked") == true) {
        localStorage.setItem("dretcheck", 1);
        /** @type {number} */
        defobj_1.ret = 1;
      }
      if ($("#dretcheck").prop("checked") == false) {
        localStorage.setItem("dretcheck", 0);
        /** @type {number} */
        defobj_1.ret = 0;
      }
      var tempx_6;
      var tempy_6;
      /** @type {number} */
      var i_36 = 1;
      for (; i_36 < 15; i_36++) {
        if ($("#d" + i_36 + "x").val()) {
          tempx_6 = $("#d" + i_36 + "x").val();
          tempy_6 = $("#d" + i_36 + "y").val();
          defobj_1.targets.x.push(tempx_6);
          defobj_1.targets.y.push(tempy_6);
          defobj_1.targets.cstr.push(tempx_6 + ":" + tempy_6);
          defobj_1.targets.dist.push(Math.sqrt((tempx_6 - city_.x) * (tempx_6 - city_.x) + (tempy_6 - city_.y) * (tempy_6 - city_.y)));
          defobj_1.targets.numb++;
        }
      }
      for (i_36 in poll2_.city.tc) {
        if (poll2_.city.tc[i_36]) {
          defobj_1.t.tot.push(Math.ceil(poll2_.city.tc[i_36] * Number($("#defperc").val()) / 100));
          defobj_1.t.home.push(Math.ceil(poll2_.city.th[i_36] * Number($("#defperc").val()) / 100));
          defobj_1.t.type.push(Number(i_36));
          if ($("#usedef" + i_36).prop("checked") == true) {
            defobj_1.t.speed.push(ttspeed_[i_36] / ttspeedres_[i_36]);
            defobj_1.t.use.push(1);
          } else {
            defobj_1.t.speed.push(0);
            defobj_1.t.use.push(0);
          }
          defobj_1.t.amount.push(0);
        }
      }
      SendDef_(defobj_1);
    });
    $("#attackGo").click(function() {
      $("#warcouncbox").show();
      tabs_.tabs("option", "active", 3);
      jQuery("#attacktab")[0].click();
    });
    $("#defGo").click(function() {
      $("#warcouncbox").show();
      tabs_.tabs("option", "active", 4);
      $("#deftab").click();
    });
    $("#ndefGo").click(function() {
      cotgsubscribe.subscribe("regional", function(data_50) {
        var x_82 = data_50.x;
        var y_62 = data_50.y;
        var info_ = data_50.info;
        $("#ndefx").val(x_82);
        $("#ndefy").val(y_62);
      });
      $("#warcouncbox").show();
      tabs_.tabs("option", "active", 5);
      $("#neardeftab").trigger({
        type : "click",
        originalEvent : "1"
      });
    });
    $("#neardeftab").click(function() {
      cotgsubscribe.subscribe("regional", function(data_51) {
        var x_83 = data_51.x;
        var y_63 = data_51.y;
        var info_1 = data_51.info;
        $("#ndefx").val(x_83);
        $("#ndefy").val(y_63);
      });
    });
    $("#ui-id-115").click(function() {
      cotgsubscribe.subscribe("regional", function(data_52) {
        var x_84 = data_52.x;
        var y_64 = data_52.y;
        var info_2 = data_52.info;
        $("#ndefx").val(x_84);
        $("#ndefy").val(y_64);
      });
    });
    $("#noffGo").click(function() {
      $("#warcouncbox").show();
      tabs_.tabs("option", "active", 6);
      $("#nearofftab").trigger({
        type : "click",
        originalEvent : "1"
      });
    });
    $("#addtoAtt").click(function() {
      /** @type {number} */
      var i_37 = 1;
      for (; i_37 < 8; i_37++) {
        if (!$("#t" + i_37 + "x").val()) {
          /** @type {number} */
          var tid_4 = Number($("#showReportsGo").attr("data"));
          var tempx_7;
          var tempy_7;
          /** @type {number} */
          tempx_7 = Number(tid_4 % 65536);
          /** @type {number} */
          tempy_7 = Number((tid_4 - tempx_7) / 65536);
          $("#t" + i_37 + "x").val(tempx_7);
          $("#t" + i_37 + "y").val(tempy_7);
          break;
        }
      }
    });
    $("#addtoDef").click(function() {
      /** @type {number} */
      var i_38 = 1;
      for (; i_38 < 15; i_38++) {
        if (!$("#d" + i_38 + "x").val()) {
          /** @type {number} */
          var tid_5 = Number($("#showReportsGo").attr("data"));
          var tempx_8;
          var tempy_8;
          /** @type {number} */
          tempx_8 = Number(tid_5 % 65536);
          /** @type {number} */
          tempy_8 = Number((tid_5 - tempx_8) / 65536);
          $("#d" + i_38 + "x").val(tempx_8);
          $("#d" + i_38 + "y").val(tempy_8);
          break;
        }
      }
    });
    $("#quickdefCityGo").click(function() {
      /** @type {number} */
      var tid_6 = Number($("#showReportsGo").attr("data"));
      var tempx_9;
      var tempy_9;
      /** @type {number} */
      tempx_9 = Number(tid_6 % 65536);
      /** @type {number} */
      tempy_9 = Number((tid_6 - tempx_9) / 65536);
      var defobj_2 = {
        targets : {
          x : [tempx_9],
          y : [tempy_9],
          dist : [],
          numb : 1
        },
        t : {
          home : [],
          type : [],
          use : [],
          speed : [],
          amount : []
        },
        perc : 100,
        dep : 0,
        ret : 0,
        rettime : 0,
        hr : 0,
        min : 0,
        sec : 0,
        dat : 0
      };
      defobj_2.targets.dist.push(Math.sqrt((tempx_9 - city_.x) * (tempx_9 - city_.x) + (tempy_9 - city_.y) * (tempy_9 - city_.y)));
      var i_39;
      for (i_39 in city_.th) {
        if (city_.th[i_39]) {
          defobj_2.t.home.push(Math.ceil(city_.th[i_39] * Number($("#defperc").val()) / 100));
          defobj_2.t.type.push(Number(i_39));
          defobj_2.t.speed.push(ttspeed_[i_39] / ttspeedres_[i_39]);
          defobj_2.t.use.push(1);
          defobj_2.t.amount.push(0);
        }
      }
      SendDef_(defobj_2);
    });
    $("#ndefup").click(function() {
      /** @type {number} */
      var tempxs_ = Number($("#ndefx").val());
      /** @type {number} */
      var tempys_ = Number($("#ndefy").val());
      /** @type {number} */
      var tids_ = tempxs_ + tempys_ * 65536;
      $("#asdfgh").data(tids_);
      $("#asdfgh").text(tempxs_ + ":" + tempys_);
      jQuery.ajax({
        url : "overview/trpover.php",
        type : "POST",
        aysnc : true,
        success : function success_11(data_53) {
          /** @type {*} */
          var t_6 = JSON.parse(data_53);
          neardeftable_(t_6);
        }
      });
    });
    $("#noffup").click(function() {
      jQuery.ajax({
        url : "overview/trpover.php",
        type : "POST",
        aysnc : true,
        success : function success_12(data_54) {
          /** @type {*} */
          var t_7 = JSON.parse(data_54);
          nearofftable_(t_7);
        }
      });
    });
    $("#Aexport").click(function() {
      var Aexp_1 = {
        x : [],
        y : [],
        type : [],
        time : []
      };
      /** @type {number} */
      var i_40 = 1;
      for (; i_40 < 16; i_40++) {
        if ($("#t" + i_40 + "x").val()) {
          Aexp_1.x.push($("#t" + i_40 + "x").val());
          Aexp_1.y.push($("#t" + i_40 + "y").val());
          Aexp_1.type.push($("#type" + i_40).val());
        }
      }
      Aexp_1.time[0] = $("#attackHr").val();
      Aexp_1.time[1] = $("#attackMin").val();
      Aexp_1.time[2] = $("#attackSec").val();
      Aexp_1.time[3] = $("#attackDat").val();
      /** @type {(null|string)} */
      var aa_6 = prompt("Attack Orders Expot", JSON.stringify(Aexp_1));
    });
    $("#Aimport").click(function() {
      $("body").append(expwin_);
      $("#ExpImp").draggable({
        handle : ".popUpBar",
        containment : "window",
        scroll : false
      });
      document.addEventListener("paste", function(evt_27) {
        $("#expstring").val(evt_27.clipboardData.getData("text/plain"));
      });
      $("#applyExp").click(function() {
        Aimp_($("#expstring").val());
        $("#ExpImp").remove();
      });
    });
  });
  $(document).ready(function() {
    /** @type {string} */
    var fourbutton_ = "<div id='fourbuttons' class='commandinndiv'><div><button id='fb1' style='height:28px; width:65px; margin-left:7px; margin-bottom:5px ; border-radius:4px ; font-size: 10px !important; padding: 0px;' class='regButton greenb'>ON/OFF</button><button id='fb2' style='height:28px; width:65px; margin-left:7px; margin-bottom:5px ; border-radius:4px ; font-size: 10px !important; padding: 0px;' class='regButton greenb'>Refine</button><button id='fb3' style='height:28px; width:65px; margin-left:7px; margin-bottom:5px ; border-radius:4px ; font-size: 10px !important; padding: 0px;' class='regButton greenb'>Raid</button><button id='fb4' style='height:28px; width:65px; margin-left:7px; margin-bottom:5px ; border-radius:4px ; font-size: 10px !important; padding: 0px;' class='regButton greenb'>Demolish</button></div></div>";
    /** @type {string} */
    var bdcountbox_ = "<div id='currentBd'><div id='bdcountbar' class='queueBar'>";
    /** @type {string} */
    bdcountbox_ = bdcountbox_ + "<div id='bdcountbut' class='tradeqarr2'><div></div></div><span class='qbspan'>Current Buildings</span>";
    /** @type {string} */
    bdcountbox_ = bdcountbox_ + "<div id='numbdleft' class='barRightFloat tooltipstered'>0</div>";
    /** @type {string} */
    bdcountbox_ = bdcountbox_ + "</div><div id='bdcountwin' class='queueWindow' style='display: block;'></div></div>";
    $("#buildQueue").before(fourbutton_);
    /** @type {string} */
    var fillbut_ = '<button id="fillque" class="greenb tooltipstered" style="height:18px; width:40px; margin-left:7px; margin-top:5px ; border-radius:4px ; font-size: 10px !important; padding: 0px;">Fill</button>';
    $("#sortbut").after(fillbut_);
    $("#fillque").click(function() {
      var dfs_ = poll2_.city.cid;
      console.log(dfs_);
      event.stopPropagation();
      var bB_ = $.post("/overview/fillq.php", {
        a : dfs_
      });
    });
    /** @type {string} */
    var convbut_ = '<button id="convque" class="greenb tooltipstered" style="height:18px; width:60px; margin-left:7px; margin-top:5px ; border-radius:4px ; font-size: 10px !important; padding: 0px;">Convert</button>';
    $("#sortbut").after(convbut_);
    $("#convque").click(function() {
      var cfd_ = poll2_.city.cid;
      console.log(cfd_);
      event.stopPropagation();
      var cB_ = $.post("/overview/mconv.php", {
        a : cfd_
      });
    });
    $("#fb1").click(function() {
      $("#councillorPopUpBox").show();
      jQuery("#ui-id-11")[0].click();
      jQuery("#couonoffdv")[0].click();
      setTimeout(function() {
        jQuery("#councillorXbutton")[0].click();
      }, 100);
      if (coon_ == 0) {
        /** @type {number} */
        coon_ = 1;
        $(this).removeClass("greenb");
        $(this).addClass("redb");
      } else {
        /** @type {number} */
        coon_ = 0;
        $(this).removeClass("redb");
        $(this).addClass("greenb");
      }
    });
    $("#fb2").click(function() {
      $("#tradePopUpBox").show();
      setTimeout(function() {
        jQuery("#ui-id-27")[0].click();
      }, 100);
    });
    $("#fb3").click(function() {
      $("#warcouncbox").show();
      jQuery("#ui-id-19")[0].click();
    });
    /** @type {number} */
    var autodemoon_ = 0;
    $("#fb4").click(function() {
      if (autodemoon_ == 0) {
        /** @type {number} */
        autodemoon_ = 1;
        $(this).removeClass("greenb");
        $(this).addClass("redb");
      } else {
        /** @type {number} */
        autodemoon_ = 0;
        $(this).removeClass("redb");
        $(this).addClass("greenb");
      }
    });
    $("#centarrowNextDiv").click(function() {
      /** @type {number} */
      autodemoon_ = 0;
      $("#fb4").removeClass("redb").addClass("greenb");
    });
    $("#centarrowPrevDiv").click(function() {
      /** @type {number} */
      autodemoon_ = 0;
      $("#fb4").removeClass("redb").addClass("greenb");
    });
    $("#ddctd").click(function() {
      /** @type {number} */
      autodemoon_ = 0;
      $("#fb4").removeClass("redb").addClass("greenb");
    });
    $("#qbuildtbButton").click(function() {
      /** @type {number} */
      autodemoon_ = 0;
      $("#fb4").removeClass("redb").addClass("greenb");
    });
    $("#city_map").click(function() {
      if (autodemoon_ == 1) {
        $("#buildingDemolishButton").trigger({
          type : "click",
          originalEvent : "1"
        });
      }
    });
    /** @type {string} */
    var sumbut_ = "<button class='tabButton' id='Sum'>Summary</button>";
    $("#items").after(sumbut_);
    $("#Sum").click(function() {
      if (sum_) {
        opensumwin_();
      } else {
        $("#sumWin").show();
      }
    });
    $("#sumWin").click(function() {
      console.log("popsum");
    });
    $("#recruitmentQueue").before(bdcountbox_);
    $("#bdcountbut").click(function() {
      if (bdcountshow_) {
        $("#bdcountwin").hide();
        $("#bdcountbut").removeClass("tradeqarr2").addClass("tradeqarr1");
        /** @type {boolean} */
        bdcountshow_ = false;
      } else {
        $("#bdcountwin").show();
        $("#bdcountbut").removeClass("tradeqarr1").addClass("tradeqarr2");
        /** @type {boolean} */
        bdcountshow_ = true;
      }
    });
    /** @type {string} */
    var wood50_ = "<td><button class='brownb' id='wood50'>Add 50%</button></td>";
    $("#woodmaxbutton").parent().after(wood50_);
    $("#wood50").click(function() {
      /** @type {number} */
      var res_3 = Number($("#maxwoodsend").text().replace(/,/g, ""));
      if ($("#landseasendres").val() == "1") {
        /** @type {number} */
        var carts_ = Math.floor(Number($("#availcartscity").text()) / 2) * 1000;
      } else {
        /** @type {number} */
        carts_ = Math.floor(Number($("#availshipscity").text()) / 2) * 10000;
      }
      if (res_3 > carts_) {
        /** @type {number} */
        res_3 = carts_;
      }
      $("#woodsendamt").val(res_3);
    });
    /** @type {string} */
    var stone50_ = "<td><button class='brownb' id='stone50'>Add 50%</button></td>";
    $("#stonemaxbutton").parent().after(stone50_);
    $("#stone50").click(function() {
      if ($("#landseasendres").val() == "1") {
        /** @type {number} */
        var carts_1 = Math.floor(Number($("#availcartscity").text()) / 2) * 1000;
      } else {
        /** @type {number} */
        carts_1 = Math.floor(Number($("#availshipscity").text()) / 2) * 10000;
      }
      /** @type {number} */
      var res_4 = Number($("#maxstonesend").text().replace(/,/g, ""));
      if (res_4 > carts_1) {
        /** @type {number} */
        res_4 = carts_1;
      }
      $("#stonesendamt").val(res_4);
    });
    /** @type {string} */
    var iron50_ = "<td><button class='brownb' id='iron50'>Add 50%</button></td>";
    $("#ironmaxbutton").parent().after(iron50_);
    $("#iron50").click(function() {
      /** @type {number} */
      var res_5 = Number($("#maxironsend").text().replace(/,/g, ""));
      if ($("#landseasendres").val() == "1") {
        /** @type {number} */
        var carts_2 = Math.floor(Number($("#availcartscity").text()) / 2) * 1000;
      } else {
        /** @type {number} */
        carts_2 = Math.floor(Number($("#availshipscity").text()) / 2) * 10000;
      }
      if (res_5 > carts_2) {
        /** @type {number} */
        res_5 = carts_2;
      }
      $("#ironsendamt").val(res_5);
    });
    /** @type {string} */
    var food50_ = "<td><button class='brownb' id='food50'>Add 50%</button></td>";
    $("#foodmaxbutton").parent().after(food50_);
    $("#food50").click(function() {
      /** @type {number} */
      var res_6 = Number($("#maxfoodsend").text().replace(/,/g, ""));
      if ($("#landseasendres").val() == "1") {
        /** @type {number} */
        var carts_3 = Math.floor(Number($("#availcartscity").text()) / 2) * 1000;
      } else {
        /** @type {number} */
        carts_3 = Math.floor(Number($("#availshipscity").text()) / 2) * 10000;
      }
      if (res_6 > carts_3) {
        /** @type {number} */
        res_6 = carts_3;
      }
      $("#foodsendamt").val(res_6);
    });
    /** @type {string} */
    var shrinebut_ = "<button class='regButton greenb' id='shrineP' style='width: 98%;margins: 1%;'>Shrine Planner</button>";
    $("#inactiveshrineInfo").before(shrinebut_);
    $("#shrineP").click(function() {
      if (beentoworld_) {
        /** @type {!Array} */
        shrinec_ = [[]];
        splayers_ = {
          name : [],
          ally : [],
          cities : []
        };
        /** @type {!Array} */
        var players_ = [];
        var coords_ = $("#coordstochatGo3").attr("data");
        /** @type {number} */
        var shrinex_ = parseInt(coords_);
        /** @type {number} */
        var shriney_ = Number(coords_.match(/\d+$/)[0]);
        /** @type {number} */
        var shrinecont_ = Number(Math.floor(shrinex_ / 100) + 10 * Math.floor(shriney_ / 100));
        var i_41;
        for (i_41 in wdata_.cities) {
          /** @type {number} */
          var tempx_10 = Number(wdata_.cities[i_41].substr(8, 3)) - 100;
          /** @type {number} */
          var tempy_10 = Number(wdata_.cities[i_41].substr(5, 3)) - 100;
          /** @type {number} */
          var cont_2 = Number(Math.floor(tempx_10 / 100) + 10 * Math.floor(tempy_10 / 100));
          if (cont_2 == shrinecont_) {
            /** @type {number} */
            var dist_1 = Math.sqrt((tempx_10 - shrinex_) * (tempx_10 - shrinex_) + (tempy_10 - shriney_) * (tempy_10 - shriney_));
            if (dist_1 < 10) {
              /** @type {number} */
              var l_4 = Number(wdata_.cities[i_41].substr(11, 1));
              /** @type {number} */
              var pid_ = Number(wdata_.cities[i_41].substr(12, l_4));
              var pname_12 = pldata_[pid_];
              /** @type {!Array} */
              var csn_ = [3, 4, 7, 8];
              if (csn_.indexOf(Number(wdata_.cities[i_41].charAt(4))) > -1) {
                shrinec_.push(["castle", pname_12, 0, tempx_10, tempy_10, dist_1, "0", 0, 0, 0]);
              } else {
                shrinec_.push(["city", pname_12, 0, tempx_10, tempy_10, dist_1, "0", 0, 0, 0]);
              }
            }
          }
        }
        shrinec_.sort(function(a, b) {
          return a[5] - b[5];
        });
        /** @type {string} */
        var planwin_ = "<div id='shrinePopup' style='width:40%;height:50%;left: 360px; z-index: 3000;' class='popUpBox'><div class='popUpBar'><span class=\"ppspan\">Shrine Planner</span><button id='hidec' class='greenb' style='margin-left:10px;border-radius: 7px;margin-top: 2px;height: 28px;'>Hide Cities</button>";
        /** @type {string} */
        planwin_ = planwin_ + '<button id=\'addcity\' class=\'greenb\' style=\'margin-left:10px;border-radius: 7px;margin-top: 2px;height: 28px;\'>Add City</button><button id="sumX" onclick="$(\'#shrinePopup\').remove();" class="xbutton greenb"><div id="xbuttondiv"><div><div id="centxbuttondiv"></div></div></div></button></div><div class="popUpWindow" style=\'height:100%\'>';
        /** @type {string} */
        planwin_ = planwin_ + "<div id='shrinediv' class='beigemenutable scroll-pane' style='background:none;border: none;padding: 0px;height:90%;'></div></div>";
        for (i_41 in shrinec_) {
          if (i_41 < 101) {
            pname_12 = shrinec_[i_41][1];
            if (players_.indexOf(pname_12) == -1) {
              players_.push(pname_12);
              jQuery.ajax({
                url : "includes/gPi.php",
                type : "POST",
                aysnc : true,
                data : {
                  a : pname_12
                },
                success : function success_13(data_55) {
                  /** @type {*} */
                  var pinfo_ = JSON.parse(data_55);
                  splayers_.name.push(pinfo_.player);
                  splayers_.ally.push(pinfo_.a);
                  splayers_.cities.push(pinfo_.h);
                }
              });
            }
          }
        }
        setTimeout(function() {
          $("#reportsViewBox").after(planwin_);
          $("#shrinePopup").draggable({
            handle : ".popUpBar",
            containment : "window",
            scroll : false
          });
          $("#shrinePopup").resizable();
          if (localStorage.getItem("hidecities")) {
            1 == 1;
          } else {
            localStorage.setItem("hidecities", "0");
          }
          if (localStorage.getItem("hidecities") == "1") {
            $("#hidec").html("Show Cities");
          }
          $("#hidec").click(function() {
            if (localStorage.getItem("hidecities") == "0") {
              hidecities_();
              localStorage.setItem("hidecities", "1");
              $("#hidec").html("Show Cities");
            } else {
              if (localStorage.getItem("hidecities") == "1") {
                showcities_();
                localStorage.setItem("hidecities", "0");
                $("#hidec").html("Hide Cities");
              }
            }
          });
          updateshrine_();
          /** @type {string} */
          var addcitypop_ = "<div id='addcityPopup' style='width:500px;height:100px;left: 360px; z-index: 3000;' class='popUpBox'><div class='popUpBar'><span class=\"ppspan\">Add City</span>";
          /** @type {string} */
          addcitypop_ = addcitypop_ + '<button id="sumX" onclick="$(\'#addcityPopup\').remove();" class="xbutton greenb"><div id="xbuttondiv"><div><div id="centxbuttondiv"></div></div></div></button></div><div class="popUpWindow" style=\'height:100%\'>';
          /** @type {string} */
          addcitypop_ = addcitypop_ + "<div><table><td>X: <input id='addx' type='number' style='width: 35px;height: 22px;font-size: 10px;'></td><td>y: <input id='addy' type='number' style='width: 35px;height: 22px;font-size: 10px;'></td>";
          /** @type {string} */
          addcitypop_ = addcitypop_ + "<td>score: <input id='addscore' type='number' style='width: 45px;height: 22px;font-size: 10px;'></td><td>Type: <select id='addtype' class='greensel' style='font-size: 15px !important;width:55%;height:30px;'>";
          /** @type {string} */
          addcitypop_ = addcitypop_ + "<option value='city'>City</option><option value='castle'>Castle</option></select></td><td><button id='addadd' class='greenb'>Add</button></td></table></div></div>";
          $("#addcity").click(function() {
            $("body").append(addcitypop_);
            $("#addcityPopup").draggable({
              handle : ".popUpBar",
              containment : "window",
              scroll : false
            });
            $("#addadd").click(function() {
              tempx_10 = $("#addx").val();
              tempy_10 = $("#addy").val();
              /** @type {number} */
              dist_1 = Math.sqrt((tempx_10 - shrinex_) * (tempx_10 - shrinex_) + (tempy_10 - shriney_) * (tempy_10 - shriney_));
              /** @type {!Array} */
              var temp_4 = [$("#addtype").val(), "Poseidon", "Atlantis", tempx_10, tempy_10, dist_1, "1", $("#addscore").val(), "Hellas", "1"];
              shrinec_.push(temp_4);
              shrinec_.sort(function(a_9, b_7) {
                return a_9[5] - b_7[5];
              });
              updateshrine_();
              $("#addcityPopup").remove();
            });
          });
        }, 2000);
      } else {
        alert("Press World Button");
      }
    });
  });
  $(document).ready(function() {
    var incomingtabledata_ = $("#incomingsAttacksTable").children().children().children();
    $("#incomingsAttacksTable table thead tr th:nth-child(2)").width(140);
    /** @type {string} */
    var Addth_ = "<th>Lock time</th>";
    incomingtabledata_.append(Addth_);
    /** @type {string} */
    var Addth1_ = "<th>Travel time</th>";
    incomingtabledata_.append(Addth1_);
    $("#allianceIncomings").parent().click(function() {
      setTimeout(function() {
        incomings_();
      }, 5000);
    });
    $("#incomingsPic").click(function() {
      setTimeout(function() {
        incomings_();
      }, 5000);
    });
  });
  cotgsubscribe.subscribe("regional", function(data_56) {
    var x_85 = data_56.x;
    var y_65 = data_56.y;
    var dtype_ = data_56.type;
    var type_113 = data_56.info.type;
    var lvl_ = data_56.info.lvl;
    var prog_ = data_56.info.prog;
    var bossname_ = data_56.info.name;
    var bossactive_ = data_56.info.active;
    var home_1;
    /** @type {number} */
    var optimalTS_ = Math.ceil(other_loot_[lvl_ - 1] / 10 * (1 - prog_ / 100 + 1) * 1.05);
    if (dtype_ === "dungeon") {
      if ($("#cityplayerInfo div table tbody tr").length === 11) {
        bossele_();
      }
      /** @type {number} */
      var i_42 = 0;
      /** @type {number} */
      var home_loot_2 = 0;
      /** @type {!Array} */
      var km_2 = [];
      for (x_85 in citytc_) {
        /** @type {number} */
        home_1 = Number(citytc_[x_85]);
        /** @type {number} */
        home_loot_2 = home_loot_2 + home_1 * ttloot_[i_42];
        km_2.push(home_1);
        /** @type {number} */
        i_42 = i_42 + 1;
        if (i_42 === 17) {
          break;
        }
      }
      if (type_113 === "Siren's Cove") {
        /** @type {number} */
        var galleyTS_ = Math.ceil(optimalTS_ / 100);
        /** @type {number} */
        var stingerTS_ = Math.ceil(optimalTS_ / 150);
        /** @type {number} */
        var warshipTS_ = Math.ceil(optimalTS_ / 300);
        /**
         * @return {undefined}
         */
        document.getElementById("raidDungGo").onclick = function() {
          setTimeout(function() {
            var i_43;
            for (i_43 in km_2) {
              if (km_2[14] || km_2[15] || km_2[16]) {
                if (km_2[16] > warshipTS_) {
                  $("#raidIP16").val(warshipTS_);
                } else {
                  if (km_2[15] > stingerTS_) {
                    $("#raidIP15").val(stingerTS_);
                  } else {
                    if (km_2[14] > galleyTS_) {
                      $("#raidIP14").val(galleyTS_);
                    } else {
                      errorgo_(message_23);
                    }
                  }
                }
              }
            }
          }, 1500);
        };
        $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text(galleyTS_);
        $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text(stingerTS_);
        $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text(warshipTS_);
      }
      if (type_113 === "Mountain Cavern") {
        /**
         * @return {undefined}
         */
        document.getElementById("raidDungGo").onclick = function() {
          setTimeout(function() {
            /** @type {number} */
            var total_lootm_ = Math.ceil(mountain_loot_[Number(lvl_) - 1] * (1 - Number(prog_) / 100 + 1) * 1.05);
            if (home_loot_2 > total_lootm_) {
              /** @type {number} */
              var option_numbersm_ = Math.floor(home_loot_2 / total_lootm_);
              /** @type {number} */
              var templ1m_ = home_loot_2 / total_lootm_ * 100 / option_numbersm_;
              /** @type {number} */
              var templ2m_ = (templ1m_ - 100) / templ1m_ * 100;
              /** @type {number} */
              var i_44 = 0;
              for (; i_44 < 14; i_44++) {
                if (km_2[i_44] !== 0) {
                  /** @type {number} */
                  var templ3m_ = km_2[i_44] / option_numbersm_;
                  /** @type {number} */
                  km_2[i_44] = Math.floor(templ3m_ * (1 - templ2m_ / 100));
                  $("#raidIP" + i_44).val(km_2[i_44]);
                }
              }
            }
          }, 1500);
        };
        /** @type {number} */
        var optimalTSM_ = Math.ceil(mountain_loot_[lvl_ - 1] / 10 * (1 - prog_ / 100 + 1) * 1.05);
        /** @type {number} */
        var cavoptim_ = Math.ceil(optimalTSM_ * 2 / 3);
        /** @type {number} */
        var praoptim_ = Math.ceil(optimalTSM_ / 2);
        /** @type {number} */
        var sorcoptim_ = Math.ceil(optimalTSM_ * 2);
        /** @type {number} */
        var RToptim_ = Math.ceil(optimalTSM_ / 3);
        $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text(optimalTSM_);
        $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text(RToptim_ + "/" + RToptim_);
        $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text(optimalTSM_);
        $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text(praoptim_);
        $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text(cavoptim_);
        $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text(cavoptim_);
        $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text(sorcoptim_);
        $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text(optimalTSM_);
        $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text(optimalTSM_);
        $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text(praoptim_);
        $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text("0");
      }
      if (type_113 === "Hill Cavern" || type_113 === "Forest Cavern") {
        /**
         * @return {undefined}
         */
        document.getElementById("raidDungGo").onclick = function() {
          setTimeout(function() {
            /** @type {number} */
            var total_looto_ = Math.ceil(other_loot_[Number(lvl_) - 1] * (1 - Number(prog_) / 100 + 1) * 1.05);
            if (home_loot_2 > total_looto_) {
              /** @type {number} */
              var option_numbers_2 = Math.floor(home_loot_2 / total_looto_);
              /** @type {number} */
              var templ1_ = home_loot_2 / total_looto_ * 100 / option_numbers_2;
              /** @type {number} */
              var templ2_ = (templ1_ - 100) / templ1_ * 100;
              /** @type {number} */
              var i_45 = 0;
              for (; i_45 < 14; i_45++) {
                if (km_2[i_45] !== 0) {
                  /** @type {number} */
                  var templ3_1 = km_2[i_45] / option_numbers_2;
                  /** @type {number} */
                  km_2[i_45] = Math.floor(templ3_1 * (1 - templ2_ / 100));
                  $("#raidIP" + i_45).val(km_2[i_45]);
                }
              }
            }
          }, 1500);
        };
        /** @type {number} */
        var cavopti_ = Math.ceil(optimalTS_ * 2 / 3);
        /** @type {number} */
        var praopti_ = Math.ceil(optimalTS_ / 2);
        /** @type {number} */
        var sorcopti_ = Math.ceil(optimalTS_ * 2);
        /** @type {number} */
        var RTopti_ = Math.ceil(optimalTS_ / 3);
        $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text(optimalTS_);
        $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text(RTopti_ + "/" + RTopti_);
        $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text(optimalTS_);
        $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text(praopti_);
        $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text(cavopti_);
        $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text(cavopti_);
        $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text(sorcopti_);
        $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text(optimalTS_);
        $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text(optimalTS_);
        $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text(praopti_);
        $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text("0");
      }
    }
    if (dtype_ === "boss") {
      if ($("#cityplayerInfo div table tbody tr").length === 11) {
        bossele_();
      }
      if (data_56.info.active) {
        /** @type {string} */
        message_23 = "Inactive Boss";
        errorgo_(message_23);
      }
      /** @type {string} */
      message_23 = "Not enough TS to kill this boss!";
      /** @type {!Array} */
      var attackres_ = [];
      /** @type {!Array} */
      var attackwres_ = [];
      for (i_42 in ttattack_) {
        /** @type {number} */
        var bossTS_ = Math.ceil(Number(bossdef_[lvl_ - 1]) * 4 / (Number(ttattack_[i_42]) * Number(Total_Combat_Research_[i_42])));
        attackres_.push(bossTS_);
        /** @type {number} */
        var bosswTS_ = Math.ceil(Number(bossdefw_[lvl_ - 1]) * 4 / (Number(ttattack_[i_42]) * Number(Total_Combat_Research_[i_42])));
        attackwres_.push(bosswTS_);
      }
      /** @type {number} */
      var home_strength_ = 0;
      /** @type {number} */
      home_loot_2 = 0;
      /** @type {!Array} */
      km_2 = [];
      /** @type {!Array} */
      var bm_ = [];
      /** @type {!Array} */
      var bmw_ = [];
      /** @type {!Array} */
      var kg_ = [];
      /** @type {number} */
      var home_TSw_ = 0;
      /** @type {number} */
      var boss_strength_ = Math.ceil(Number(bossdef_[lvl_ - 1]) * 4);
      /** @type {number} */
      var boss_strengthw_ = Math.ceil(Number(bossdefw_[lvl_ - 1]) * 4);
      /** @type {number} */
      i_42 = 0;
      for (x_85 in citytc_) {
        /** @type {number} */
        home_1 = Number(citytc_[x_85]);
        if (i_42 === 0 || i_42 === 1 || i_42 === 7 || i_42 === 12 || i_42 === 13) {
          /** @type {number} */
          home_1 = 0;
        }
        kg_.push(home_1);
        if (i_42 === 14 || i_42 === 15 || i_42 === 16) {
          /** @type {number} */
          home_1 = 0;
        }
        /** @type {number} */
        home_strength_ = home_strength_ + Number(ttattack_[i_42]) * Number(home_1) * Number(Total_Combat_Research_[i_42]);
        /** @type {number} */
        home_TSw_ = home_TSw_ + home_1 * TS_type_[i_42];
        km_2.push(home_1);
        /** @type {number} */
        i_42 = i_42 + 1;
        if (i_42 === 17) {
          break;
        }
      }
      if (home_strength_ > boss_strength_) {
        /** @type {number} */
        var proportion_ = home_strength_ / boss_strength_;
        for (i_42 in km_2) {
          /** @type {number} */
          bm_[i_42] = Math.ceil(Number(km_2[i_42]) / proportion_);
        }
      }
      if (home_strength_ > boss_strengthw_) {
        /** @type {number} */
        var proportionw_ = home_strength_ / boss_strengthw_;
        for (i_42 in km_2) {
          /** @type {number} */
          bmw_[i_42] = Math.ceil(Number(km_2[i_42]) / proportionw_);
        }
      }
      if (bossname_ === "Triton") {
        /** @type {!Array} */
        var bmz_ = [];
        /** @type {number} */
        var home_strengthw_ = 0;
        /** @type {number} */
        var galleytroops_ = 0;
        /** @type {number} */
        var tempgalley_ = 0;
        /** @type {number} */
        var galley_TSneeded_ = Math.ceil(home_TSw_ / 500);
        if (kg_[14]) {
          /** @type {number} */
          home_strengthw_ = home_strength_ + Number(galley_TSneeded_) * 3000 * Number(Total_Combat_Research_[14]);
          if (home_strengthw_ > boss_strength_) {
            /** @type {number} */
            var proportionz_ = home_strengthw_ / boss_strength_;
            for (i_42 in km_2) {
              /** @type {number} */
              bmz_[i_42] = Math.ceil(Number(km_2[i_42]) / proportionz_);
              /** @type {number} */
              tempgalley_ = tempgalley_ + bmz_[i_42] * TS_type_[i_42];
            }
          }
          /** @type {number} */
          galleytroops_ = Math.ceil(tempgalley_ / 500);
        }
        /**
         * @return {undefined}
         */
        document.getElementById("raidDungGo").onclick = function() {
          setTimeout(function() {
            if ((kg_[14] || kg_[15] || kg_[16]) && !kg_[5] && !kg_[6] && !kg_[8] && !kg_[9] && !kg_[10] && !kg_[11] && !kg_[2] && !kg_[3] && !kg_[4]) {
              if (kg_[16] > attackwres_[16]) {
                $("#raidIP16").val(attackwres_[16]);
              } else {
                if (kg_[15] > attackwres_[15]) {
                  $("#raidIP15").val(attackwres_[15]);
                } else {
                  if (kg_[14] > attackwres_[14]) {
                    $("#raidIP14").val(attackwres_[14]);
                  } else {
                    errorgo_(message_23);
                  }
                }
              }
            } else {
              if (kg_[14] && (kg_[5] || kg_[6] || kg_[8] || kg_[9] || kg_[10] || kg_[11] || kg_[2] || kg_[3] || kg_[4])) {
                if (kg_[14] > galleytroops_ && bmz_.length > 0) {
                  var i_46;
                  for (i_46 in km_2) {
                    $("#raidIP" + [i_46]).val(bmz_[i_46]);
                  }
                  $("#raidIP14").val(galleytroops_);
                } else {
                  if (kg_[14] > attackwres_[14]) {
                    $("#raidIP14").val(attackwres_[14]);
                  } else {
                    errorgo_(message_23);
                  }
                }
              } else {
                errorgo_(message_23);
              }
            }
          }, 1500);
        };
        $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text(attackres_[5]);
        $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text(attackres_[10]);
        $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text(attackres_[6]);
        $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text(attackres_[11]);
        $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text(attackwres_[14]);
        $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text(attackwres_[15]);
        $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text(attackwres_[16]);
      }
      if (bossname_ == "Cyclops") {
        /**
         * @return {undefined}
         */
        document.getElementById("raidDungGo").onclick = function() {
          setTimeout(function() {
            var i_47;
            for (i_47 in km_2) {
              if ((km_2[8] || km_2[9] || km_2[10]) && !km_2[5] && !km_2[6] && !km_2[2] && !km_2[3] && !km_2[4] && !km_2[11]) {
                $("#raidIP" + [i_47]).val(bmw_[i_47]);
                if (bmw_.length === 0) {
                  errorgo_(message_23);
                  break;
                }
              } else {
                $("#raidIP" + [i_47]).val(bm_[i_47]);
                if (bm_.length === 0) {
                  errorgo_(message_23);
                  break;
                }
              }
            }
          }, 1500);
        };
        $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text(attackres_[5]);
        $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text(attackres_[2]);
        $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text(attackres_[3]);
        $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text(attackwres_[8]);
        $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text(attackwres_[10]);
        $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text(attackres_[6]);
        $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text(attackres_[11]);
        $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text(attackres_[4]);
        $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text(attackwres_[9]);
        $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text(attackwres_[7]);
        $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text("0");
      }
      if (bossname_ == "Andar's Colosseum Challenge") {
        /**
         * @return {undefined}
         */
        document.getElementById("raidDungGo").onclick = function() {
          setTimeout(function() {
            var i_48;
            for (i_48 in km_2) {
              if ((km_2[8] || km_2[9] || km_2[10]) && !km_2[5] && !km_2[6] && !km_2[2] && !km_2[3] && !km_2[4] && !km_2[11]) {
                $("#raidIP" + [i_48]).val(bmw_[i_48]);
                if (bmw_.length === 0) {
                  errorgo_(message_23);
                  break;
                }
              } else {
                $("#raidIP" + [i_48]).val(bm_[i_48]);
              }
              if (bm_.length === 0) {
                errorgo_(message_23);
                break;
              }
            }
          }, 1500);
        };
        $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text(attackres_[5]);
        $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text(attackres_[2]);
        $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text(attackres_[3]);
        $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text(attackwres_[8]);
        $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text(attackwres_[10]);
        $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text(attackres_[6]);
        $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text(attackres_[11]);
        $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text(attackres_[4]);
        $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text(attackwres_[9]);
        $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text(attackwres_[7]);
        $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text("0");
      }
      if (bossname_ == "Romulus and Remus") {
        /**
         * @return {undefined}
         */
        document.getElementById("raidDungGo").onclick = function() {
          setTimeout(function() {
            var i_49;
            for (i_49 in km_2) {
              if ((km_2[2] || km_2[3] || km_2[4] || km_2[5]) && !km_2[6] && !km_2[8] && !km_2[9] && !km_2[10] && !km_2[11]) {
                $("#raidIP" + [i_49]).val(bmw_[i_49]);
                if (bmw_.length === 0) {
                  errorgo_(message_23);
                  break;
                }
              } else {
                $("#raidIP" + [i_49]).val(bm_[i_49]);
              }
              if (bm_.length === 0) {
                errorgo_(message_23);
                break;
              }
            }
          }, 1500);
        };
        $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text(attackwres_[5]);
        $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text(attackwres_[2]);
        $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text(attackwres_[3]);
        $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text(attackres_[8]);
        $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text(attackres_[10]);
        $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text(attackres_[6]);
        $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text(attackres_[11]);
        $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text(attackwres_[4]);
        $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text(attackres_[9]);
        $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text(attackres_[7]);
        $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text("0");
      }
      if (bossname_ == "Dragon") {
        /**
         * @return {undefined}
         */
        document.getElementById("raidDungGo").onclick = function() {
          setTimeout(function() {
            var i_50;
            for (i_50 in km_2) {
              if ((km_2[2] || km_2[3] || km_2[4] || km_2[5]) && !km_2[6] && !km_2[8] && !km_2[9] && !km_2[10] && !km_2[11]) {
                $("#raidIP" + [i_50]).val(bmw_[i_50]);
                if (bmw_.length === 0) {
                  errorgo_(message_23);
                  break;
                }
              } else {
                $("#raidIP" + [i_50]).val(bm_[i_50]);
              }
              if (bm_.length === 0) {
                errorgo_(message_23);
                break;
              }
            }
          }, 1500);
        };
        $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text(attackwres_[5]);
        $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text(attackwres_[2]);
        $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text(attackwres_[3]);
        $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text(attackres_[8]);
        $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text(attackres_[10]);
        $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text(attackres_[6]);
        $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text(attackres_[11]);
        $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text(attackwres_[4]);
        $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text(attackres_[9]);
        $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text(attackres_[7]);
        $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text("0");
      }
      if (bossname_ == "Gorgon") {
        /**
         * @return {undefined}
         */
        document.getElementById("raidDungGo").onclick = function() {
          setTimeout(function() {
            var i_51;
            for (i_51 in km_2) {
              if ((km_2[6] || km_2[11]) && !km_2[4] && !km_2[5] && !km_2[3] && !km_2[8] && !km_2[9] && !km_2[10] && !km_2[2]) {
                $("#raidIP" + [i_51]).val(bmw_[i_51]);
                if (bmw_.length === 0) {
                  errorgo_(message_23);
                  break;
                }
              } else {
                $("#raidIP" + [i_51]).val(bm_[i_51]);
              }
              if (bm_.length === 0) {
                errorgo_(message_23);
                break;
              }
            }
          }, 1500);
        };
        $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text(attackres_[5]);
        $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text(attackres_[2]);
        $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text(attackres_[3]);
        $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text(attackres_[8]);
        $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text(attackres_[10]);
        $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text(attackwres_[6]);
        $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text(attackwres_[11]);
        $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text(attackres_[4]);
        $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text(attackres_[9]);
        $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text(attackres_[7]);
        $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text("0");
      }
      if (bossname_ == "Gladiator") {
        /**
         * @return {undefined}
         */
        document.getElementById("raidDungGo").onclick = function() {
          setTimeout(function() {
            var i_52;
            for (i_52 in km_2) {
              if ((km_2[6] || km_2[11]) && !km_2[4] && !km_2[5] && !km_2[3] && !km_2[8] && !km_2[9] && !km_2[10] && !km_2[2]) {
                $("#raidIP" + [i_52]).val(bmw_[i_52]);
                if (bmw_.length === 0) {
                  errorgo_(message_23);
                  break;
                }
              } else {
                $("#raidIP" + [i_52]).val(bm_[i_52]);
              }
              if (bm_.length === 0) {
                errorgo_(message_23);
                break;
              }
            }
          }, 1500);
        };
        $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text(attackres_[5]);
        $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text(attackres_[2]);
        $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text(attackres_[3]);
        $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text(attackres_[8]);
        $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text(attackres_[10]);
        $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text(attackwres_[6]);
        $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text(attackwres_[11]);
        $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text(attackres_[4]);
        $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text(attackres_[9]);
        $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text(attackres_[7]);
        $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text("0");
        $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text("0");
      }
    }
    if (dtype_ === "city") {
      $("#cityplayerInfo div table tbody tr:gt(6)").remove();
    }
  });
  $(document).ready(function() {
    /** @type {string} */
    var newbutz_ = "<div style='float: left; margin-left: 2%;'><button id='newbuttonu' style='font-size:8px; padding: 4px; border-radius: 8px;' class='greenb shRnTr'>Recall(<90%)</button></div>";
    $("#totalTS").before(newbutz_);
    $("#newbuttonu").click(function() {
      setTimeout(function() {
        recallraidl100_();
      }, 500);
    });
    $("#totalTS").click(function() {
      setTimeout(function() {
        carrycheck_();
      }, 500);
    });
    $("#loccavwarconGo").click(function() {
      setTimeout(function() {
        getDugRows_();
      }, 1000);
    });
    $("#raidmantab").click(function() {
      setTimeout(function() {
        getDugRows_();
      }, 1000);
    });
    $("#allianceIncomings").parent().click(function() {
      setTimeout(function() {
        incomings_();
      }, 4000);
    });
    $("#ui-id-37").click(function() {
      setTimeout(function() {
        incomings_();
      }, 1000);
    });
    setTimeout(function() {
      Total_Research_();
    }, 20000);
    if (localStorage.getItem("raidbox") == 1) {
      /** @type {string} */
      var raidboxback_ = "<button class='regButton greenb' id='raidboxb' style='width:120px; margin-left: 2%;'>Return Raiding Box</button>";
      $("#squaredung td").find(".squarePlayerInfo").before(raidboxback_);
      $("#raidboxb").click(function() {
        localStorage.setItem("raidbox", "0");
        $("#raidboxb").remove();
      });
    }
    /** @type {string} */
    var cancelallya_ = "<input id='cancelAllya' type='checkbox' checked='checked'> Cancel attack if same alliance";
    /** @type {string} */
    var cancelallys_ = "<input id='cancelAllys' type='checkbox' checked='checked'> Cancel attack if same alliance";
    /** @type {string} */
    var cancelallyp_ = "<input id='cancelAllyp' type='checkbox' checked='checked'> Cancel attack if same alliance";
    /** @type {string} */
    var cancelallyc_ = "<input id='cancelAllyc' type='checkbox' checked='checked'> Cancel attack if same alliance";
    $("#assaulttraveltime").parent().next().html(cancelallya_);
    $("#siegetraveltime").parent().next().html(cancelallys_);
    $("#plundtraveltime").parent().next().html(cancelallyp_);
    $("#scouttraveltime").parent().next().html(cancelallyc_);
    $("#assaultGo").click(function() {
      if ($("#cancelAllya").prop("checked") == false) {
        setTimeout(function() {
          $(".shAinf").each(function() {
            var tid_7 = $(this).parent().next().find(".cityblink").attr("data");
            /** @type {number} */
            var tx_1 = tid_7 % 65536;
            /** @type {number} */
            var ty_1 = (tid_7 - tx_1) / 65536;
            if (tx_1 == $("#assaultxcoord").val() && ty_1 == $("#assaultycoord").val()) {
              var aid_ = $(this).attr("data");
              var dat_7 = {
                a : aid_,
                b : 1
              };
              jQuery.ajax({
                url : "includes/UaO.php",
                type : "POST",
                aysnc : true,
                data : dat_7
              });
            }
          });
          $(".shPinf").each(function() {
            var tid_8 = $(this).parent().next().find(".cityblink").attr("data");
            /** @type {number} */
            var tx_2 = tid_8 % 65536;
            /** @type {number} */
            var ty_2 = (tid_8 - tx_2) / 65536;
            if (tx_2 == $("#assaultxcoord").val() && ty_2 == $("#assaultycoord").val()) {
              var aid_1 = $(this).attr("data");
              var dat_8 = {
                a : aid_1,
                b : 1
              };
              jQuery.ajax({
                url : "includes/UpO.php",
                type : "POST",
                aysnc : true,
                data : dat_8
              });
            }
          });
        }, 4000);
      }
    });
    $("#plunderGo").click(function() {
      if ($("#cancelAllyp").prop("checked") == false) {
        setTimeout(function() {
          $(".shAinf").each(function() {
            var tid_9 = $(this).parent().next().find(".cityblink").attr("data");
            /** @type {number} */
            var tx_3 = tid_9 % 65536;
            /** @type {number} */
            var ty_3 = (tid_9 - tx_3) / 65536;
            if (tx_3 == $("#pluxcoord").val() && ty_3 == $("#pluycoord").val()) {
              var aid_2 = $(this).attr("data");
              var dat_9 = {
                a : aid_2,
                b : 1
              };
              jQuery.ajax({
                url : "includes/UaO.php",
                type : "POST",
                aysnc : true,
                data : dat_9
              });
            }
          });
          $(".shPinf").each(function() {
            var tid_10 = $(this).parent().next().find(".cityblink").attr("data");
            /** @type {number} */
            var tx_4 = tid_10 % 65536;
            /** @type {number} */
            var ty_4 = (tid_10 - tx_4) / 65536;
            if (tx_4 == $("#pluxcoord").val() && ty_4 == $("#pluycoord").val()) {
              var aid_3 = $(this).attr("data");
              var dat_10 = {
                a : aid_3,
                b : 1
              };
              jQuery.ajax({
                url : "includes/UpO.php",
                type : "POST",
                aysnc : true,
                data : dat_10
              });
            }
          });
        }, 4000);
      }
    });
    $("#scoutGo").click(function() {
      if ($("#cancelAllyc").prop("checked") == false) {
        setTimeout(function() {
          $(".shAinf").each(function() {
            var tid_11 = $(this).parent().next().find(".cityblink").attr("data");
            /** @type {number} */
            var tx_5 = tid_11 % 65536;
            /** @type {number} */
            var ty_5 = (tid_11 - tx_5) / 65536;
            if (tx_5 == $("#scoxcoord").val() && ty_5 == $("#scoycoord").val()) {
              var aid_4 = $(this).attr("data");
              var dat_11 = {
                a : aid_4,
                b : 1
              };
              jQuery.ajax({
                url : "includes/UaO.php",
                type : "POST",
                async: false,
                data : dat_11
              });
            }
          });
          $(".shPinf").each(function() {
            var tid_12 = $(this).parent().next().find(".cityblink").attr("data");
            /** @type {number} */
            var tx_6 = tid_12 % 65536;
            /** @type {number} */
            var ty_6 = (tid_12 - tx_6) / 65536;
            if (tx_6 == $("#scoxcoord").val() && ty_6 == $("#scoycoord").val()) {
              var aid_5 = $(this).attr("data");
              var dat_12 = {
                a : aid_5,
                b : 1
              };
              jQuery.ajax({
                url : "includes/UpO.php",
                type : "POST",
                async: false,
                data : dat_12
              });
            }
          });
        }, 4000);
      }
    });
    $("#siegeGo").click(function() {
      if ($("#cancelAllys").prop("checked") == false) {
        setTimeout(function() {
          $(".shAinf").each(function() {
            var tid_13 = $(this).parent().next().find(".cityblink").attr("data");
            /** @type {number} */
            var tx_7 = tid_13 % 65536;
            /** @type {number} */
            var ty_7 = (tid_13 - tx_7) / 65536;
            if (tx_7 == $("#siexcoord").val() && ty_7 == $("#sieycoord").val()) {
              var aid_6 = $(this).attr("data");
              var dat_13 = {
                a : aid_6,
                b : 1
              };
              jQuery.ajax({
                url : "includes/UaO.php",
                type : "POST",
                async: false,
                data : dat_13
              });
            }
          });
          $(".shPinf").each(function() {
            var tid_14 = $(this).parent().next().find(".cityblink").attr("data");
            /** @type {number} */
            var tx_8 = tid_14 % 65536;
            /** @type {number} */
            var ty_8 = (tid_14 - tx_8) / 65536;
            if (tx_8 == $("#siexcoord").val() && ty_8 == $("#sieycoord").val()) {
              var aid_7 = $(this).attr("data");
              var dat_14 = {
                a : aid_7,
                b : 1
              };
              jQuery.ajax({
                url : "includes/UpO.php",
                type : "POST",
                async: false,
                data : dat_14
              });
            }
          });
        }, 4000);
      }
    });
  });
  $(document).ready(function() {
    $("#citynotes").draggable({
      handle : ".popUpBar",
      containment : "window",
      scroll : false
    });
    $("#citynotes").height("310px");
    $("#citynotes").width("495px");
    /** @type {string} */
    var layoutopttab_ = "<li id='layoutopt' class='ui-state-default ui-corner-top' role='tab' tabindex='-1' aria-controls='layoutoptBody'";
    /** @type {string} */
    layoutopttab_ = layoutopttab_ + "aria-labeledby='ui-id-60' aria-selected='false' aria-expanded='false'>";
    /** @type {string} */
    layoutopttab_ = layoutopttab_ + "<a href='#layoutoptBody' class='ui-tabs-anchor' role='presentation' tabindex='-1' id='ui-id-60'>Layout Options</a></li>";
    /** @type {string} */
    var layoutoptbody_ = "<div id='layoutoptBody' aria-labeledby='ui-id-60' class='ui-tabs-panel ui-widget-content ui-corner-bottom' ";
    /** @type {string} */
    layoutoptbody_ = layoutoptbody_ + " role='tabpanel' aria-hidden='true' style='display: none;'><table><tbody><tr><td><input id='addnotes' class='clsubopti' type='checkbox'> Add Notes</td>";
    /** @type {string} */
    layoutoptbody_ = layoutoptbody_ + "<td><input id='addtroops' class='clsubopti' type='checkbox'> Add Troops</td></tr><tr><td><input id='addtowers' class='clsubopti' type='checkbox'> Add Towers</td><td><input id='addbuildings' class='clsubopti' type='checkbox'> Upgrade Cabins</td>";
    /** @type {string} */
    layoutoptbody_ = layoutoptbody_ + "<td> Cabin Lvl: <input id='cablev' type='number' style='width:22px;' value='7'></td></tr><tr><td><input id='addwalls' class='clsubopti' type='checkbox'> Add Walls</td>";
    /** @type {string} */
    layoutoptbody_ = layoutoptbody_ + "<td><input id='addhub' class='clsubopti' type='checkbox'> Set Nearest Hub With layout</td></tr><tr><td>Select Hubs list: </td><td id='selhublist'></td><td>";
    /** @type {string} */
    layoutoptbody_ = layoutoptbody_ + "<button id='nearhubAp' class='regButton greenb' style='width:130px; margin-left: 10%'>Set Nearest Hub</button><button id='infantryAp' class='regButton greenb' style='width:130px; margin-left: 10%'>Infantry setup</button></td></tr></tbody></table>";
    /** @type {string} */
    layoutoptbody_ = layoutoptbody_ + "<table><tbody><tr><td colspan='2'><input id='addres' class='clsubopti' type='checkbox'> Add Resources:</td><td id='buttd' colspan='2'></td></tr><tr><td>wood<input id='woodin' type='number' style='width:100px;' value='200000'></td><td>stones<input id='stonein' type='number' style='width:100px;' value='220000'></td>";
    /** @type {string} */
    layoutoptbody_ = layoutoptbody_ + "<td>iron<input id='ironin' type='number' style='width:100px;' value='200000'></td><td>food<input id='foodin' type='number' style='width:100px;' value='350000'></td></tr>";
    /** @type {string} */
    layoutoptbody_ = layoutoptbody_ + "</tbody></table></div>";
    /** @type {string} */
    var layoptbut_ = "<button id='layoptBut' class='regButton greenb' style='width:150px;'>Save Res Settings</button>";
    var tabs_1 = $("#CNtabs").tabs();
    var ul_1 = tabs_1.find("ul");
    $(layoutopttab_).appendTo(ul_1);
    tabs_1.tabs("refresh");
    $("#CNtabs").append(layoutoptbody_);
    $("#buttd").append(layoptbut_);
    $("#nearhubAp").click(function() {
      setnearhub_();
    });
    $("#infantryAp").click(function() {
      setinfantry_();
    });
    $("#layoptBut").click(function() {
      localStorage.setItem("woodin", $("#woodin").val());
      localStorage.setItem("foodin", $("#foodin").val());
      localStorage.setItem("ironin", $("#ironin").val());
      localStorage.setItem("stonein", $("#stonein").val());
      localStorage.setItem("cablev", $("#cablev").val());
    });
    if (localStorage.getItem("cablev")) {
      $("#cablev").val(localStorage.getItem("cablev"));
    }
    if (localStorage.getItem("woodin")) {
      $("#woodin").val(localStorage.getItem("woodin"));
    }
    if (localStorage.getItem("stonein")) {
      $("#stonein").val(localStorage.getItem("stonein"));
    }
    if (localStorage.getItem("ironin")) {
      $("#ironin").val(localStorage.getItem("ironin"));
    }
    if (localStorage.getItem("foodin")) {
      $("#foodin").val(localStorage.getItem("foodin"));
    }
    if (localStorage.getItem("atroops")) {
      if (localStorage.getItem("atroops") == 1) {
        $("#addtroops").prop("checked", true);
      }
    }
    if (localStorage.getItem("ares")) {
      if (localStorage.getItem("ares") == 1) {
        $("#addres").prop("checked", true);
      }
    }
    if (localStorage.getItem("abuildings")) {
      if (localStorage.getItem("abuildings") == 1) {
        $("#addbuildings").prop("checked", true);
      }
    }
    if (localStorage.getItem("anotes")) {
      if (localStorage.getItem("anotes") == 1) {
        $("#addnotes").prop("checked", true);
      }
    }
    if (localStorage.getItem("awalls")) {
      if (localStorage.getItem("awalls") == 1) {
        $("#addwalls").prop("checked", true);
      }
    }
    if (localStorage.getItem("atowers")) {
      if (localStorage.getItem("atowers") == 1) {
        $("#addtowers").prop("checked", true);
      }
    }
    if (localStorage.getItem("ahub")) {
      if (localStorage.getItem("ahub") == 1) {
        $("#addhub").prop("checked", true);
      }
    }
    $("#addnotes").change(function() {
      if ($("#addnotes").prop("checked") == true) {
        localStorage.setItem("anotes", 1);
      } else {
        localStorage.setItem("anotes", 0);
      }
    });
    $("#addres").change(function() {
      if ($("#addres").prop("checked") == true) {
        localStorage.setItem("ares", 1);
      } else {
        localStorage.setItem("ares", 0);
      }
    });
    $("#addtroops").change(function() {
      if ($("#addtroops").prop("checked") == true) {
        localStorage.setItem("atroops", 1);
      } else {
        localStorage.setItem("atroops", 0);
      }
    });
    $("#addbuildings").change(function() {
      if ($("#addbuildings").prop("checked") == true) {
        localStorage.setItem("abuildings", 1);
      } else {
        localStorage.setItem("abuildings", 0);
      }
    });
    $("#addwalls").change(function() {
      if ($("#addwalls").prop("checked") == true) {
        localStorage.setItem("awalls", 1);
      } else {
        localStorage.setItem("awalls", 0);
      }
    });
    $("#addtowers").change(function() {
      if ($("#addtowers").prop("checked") == true) {
        localStorage.setItem("atowers", 1);
      } else {
        localStorage.setItem("atowers", 0);
      }
    });
    $("#addhub").change(function() {
      if ($("#addhub").prop("checked") == true) {
        localStorage.setItem("ahub", 1);
      } else {
        localStorage.setItem("ahub", 0);
      }
    });
    $("#editspncn").click(function() {
      $("#selHub").remove();
      var selhub_ = $("#organiser").clone(false).attr({
        id : "selHub",
        style : "width:100%;height:28px;font-size:11;border-radius:6px;margin:7px"
      });
      $("#selhublist").append(selhub_);
      if (localStorage.getItem("hublist")) {
        $("#selHub").val(localStorage.getItem("hublist")).change();
      }
      $("#selHub").change(function() {
        localStorage.setItem("hublist", $("#selHub").val());
      });
      $("#dfunkylayout").remove();
      $("#funkylayoutl").remove();
      $("#funkylayoutw").remove();
      setTimeout(function() {
        var currentlayout_ = $("#currentLOtextarea").text();
        /** @type {number} */
        var i_53 = 20;
        for (; i_53 < currentlayout_.length - 20; i_53++) {
          var tmpchar_ = currentlayout_.charAt(i_53);
          /** @type {!RegExp} */
          var cmp_ = new RegExp(tmpchar_);
          if (!cmp_.test(emptyspots_)) {
            currentlayout_ = currentlayout_.replaceAt(i_53, "-");
          }
        }
        /** @type {!Array} */
        var prefered_data_ = [{
          name : "Guz 7s Prae 122k",
          string : "[ShareString.1.3]:########################-------#-------#####BBBB----#--------###BZZZB----#---------##BBBBB----#---------##BZZZZ-#######------##BBBBB##BBBBB##-----##----##BZZZZZB##----##----#BBBBBBBBB#----##----#BZZZZZZZB#----#######BBBBTBBBB#######P--X#BZZZZZZZB#----##-SSJ#BBBBBBBBB#----##P---##BZZZZZB##----##P----##BBBBB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################",
          remarks : "Landlocked Praetors",
          notes : "122000 Praetors",
          troop_count : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          res_count : [0, 0, 0, 0, 1, 575000, 575000, 575000, 575000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 575000, 575000, 575000, 575000]
        }, {
          name : "Guz 4s Arbs 132k",
          string : "[ShareString.1.3]:########################-------#-------#####BBBB----#--------###BEEEB----#---------##BBBBB----#---------##BEBEB-#######------##BBBBB##BBBBB##-----##----##BEEBEEB##----##----#BBBBBBBBB#----##----#BEEEBEEEB#----#######BBBBTBBBB#######----#EEEEBEEEB#----##----#BBBBBBBBB#----##----##BEEBEEB##----##-----##BBBBB##-----##------#######------##---------#J--------##-----SS--#X--------###----LM--#--------#####--PP---#-------########################",
          remarks : "Arbs",
          notes : "132000 Arbs",
          troop_count : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          res_count : [0, 0, 0, 0, 1, 575000, 575000, 575000, 575000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 575000, 575000, 575000, 575000]
        }, {
          name : "Guz 3s Rng 280k",
          string : "[ShareString.1.3];########################-------#-------#####BBBB----#--------###BGBGB----#---------##BBBBB----#---------##BGBGB-#######------##BBBBB##BBBBB##-----##----##BGGBGGB##----##----#BBBBBBBBB#----##----#BGGBGBGGB#----#######BBBBTBBBB#######----#BGGBGBGGB#----##----#BBBBBBBBB#----##----##BGGBGGB##----##-----##BBBBB##-----##------#######--__--##---------#J---_##_-##-----SS--#X---_###_###----LM--#-----_#######--PP---#------_########################",
          remarks : "Ranger",
          notes : "280000 Ranger",
          troop_count : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          res_count : [0, 0, 0, 0, 1, 575000, 575000, 575000, 575000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 575000, 575000, 575000, 575000]
        }, {
          name : "Guz 3s Rng/Tri 256k",
          string : "[ShareString.1.3]:########################BBBBB--#--,-,--#####-BGBGB-,#------,-###,-BGBBB--#-,-..-,--##--BGBGB-.#,-------.##--BBBB#######:-.---##----:##BBBBB##-.-,-##.-;-##GBGBGBG##----##----#BBBGBGBBB#--:-##...-#BGBGBGBGB#-::-#######BBBGTGBGB#######.SS.#BGBGBGBGB#---:##P--X#BBBGBGBBB#----##:-:J##GBGBGBG##--;-##P:---##BBBBB##,----##:--.--#######---,--##P-.--.-:-#--------,##P----.---#.--:-,-,-###,-,-.---#--------#####,----:-#.--;---########################",
          remarks : "R/T",
          notes : "128K Rng 128K Tri",
          troop_count : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          res_count : [0, 0, 0, 0, 1, 575000, 575000, 575000, 575000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 575000, 575000, 575000, 575000]
        }, {
          name : "Guz 3s R/T Ship 240K",
          string : "[ShareString.1.3];########################-------#---BBBB#####--------#---BGBGB###---------#---BGBGB-##---------#---BBBBB-##------#######BGBGB-##-----##BBBBB##GBGB-##----##BGBGBGB##BB--##----#-BGBGBGB-#----##----#-BGBGBGB-#----#######-BGBTBGB-#######----#-BGBGBGB-#----##----#-BGBGBGB-#----##----##BGBGBGB##----##-----##BBBBB##-----##------#######--RR--##---------#SS--R##R-##---------#J---R###R###--------#X----R#######-------#------R########################",
          remarks : "R/T Ship",
          notes : "120K Rng 120K Tri",
          troop_count : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          res_count : [0, 0, 0, 0, 1, 575000, 575000, 575000, 575000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 575000, 575000, 575000, 575000]
        }, {
          name : "Guz 7s Arb Ship 124K",
          string : "[ShareString.1.3];########################-------#-------#####BBB-----#--------###BEEE-----#---------##BBBBB----#---------##BEEE--#######------##BBBB-##BBBBB##-----##----##BEEBEEB##----##----#BBBBBBBBB#----##----#BEEEBEEEB#----#######BBBBTBBBB#######----#BEEEBEEEB#----##-SSX#BBBBBBBBB#----##---J##BEEBEEB##----##-----##BBBBB##-----##------#######--RR--##---------#----R##R-##---------#----R###R###--------#-----R#######-------#------R########################",
          remarks : "Arb Ship",
          notes : "124K Arb",
          troop_count : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          res_count : [0, 0, 0, 0, 1, 575000, 575000, 575000, 575000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 575000, 575000, 575000, 575000]
        }, {
          name : "Guz 7s Prae Ship 112K",
          string : "[ShareString.1.3];########################-------#-------#####BBB-----#--------###ZZZZ-----#---------##BBBBB----#---------##ZZZZ--#######------##BBBB-##BBBBB##-----##----##BZZZZZB##----##----#BBBBBBBBB#----##----#BZZZZZZZB#----#######BBBBTBBBB#######----#BZZZZZZZB#----##-SSX#BBBBBBBBB#----##---J##BZZZZZB##----##-----##BBBBB##-----##------#######--RR--##---------#----R##R-##---------#----R###R###--------#-----R#######-------#------R########################",
          remarks : "Prae Ship",
          notes : "112K Arb",
          troop_count : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          res_count : [0, 0, 0, 0, 1, 575000, 575000, 575000, 575000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 575000, 575000, 575000, 575000]
        }, {
          name : "Guz 3s Rng Ship 260K",
          string : "[ShareString.1.3];########################-------#-------#####BBB-----#--------###BGBGB----#---------##BBBBB----#---------##BGGG--#######------##-BBB-##BBBBB##-----##----##BGGBGGB##----##----#BBBBBBBBB#----##----#BGGBGBGGB#----#######BBBBTBBBB#######----#BGGBGBGGB#----##----#BBBBBBBBB#----##-SSX##BGGBGGB##----##-----##BBBBB##-----##---J--#######--RR--##---------#----R##R-##---------#----R###R###--------#-----R#######-------#------R########################",
          remarks : "Rng Ship",
          notes : "260K Arb",
          troop_count : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          res_count : [0, 0, 0, 0, 1, 575000, 575000, 575000, 575000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 575000, 575000, 575000, 575000]
        }, {
          name : "Guz 3s Vanq 300K",
          string : "[ShareString.1.3]:########################-------#-------#####--------#BBBBBBB-###---------#BGBGBGB--##---------#BBBBBBB--##------#######-BGBB-##-----##BBBBB##BBB--##----##-BGBGBZ##----##----#BBBBBBBBB#----##----#BGBGBGBGB#----#######BGBBTBBBB#######----#BGBGBGBGB#----##----#BBBBBBBBB#----##----##-BGBGB-##----##-----##BBBBB##-----##------#######------##---------#-X-------##---------#JP-------###--------#SM------#####-------#SM-----########################",
          remarks : "S - Vanq",
          notes : "300K Vanq Senator Capable",
          troop_count : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          res_count : [0, 0, 0, 0, 1, 575000, 575000, 575000, 575000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 575000, 575000, 575000, 575000]
        }, {
          name : "Guz 10s Druid 106K",
          string : "[ShareString.1.3];########################BB-----#-------#####-JJ-----#--------###BBBBB----#---------##JJJJJ----#---------##BBBBBB#######------##JJJJJ##BBBBB##-----##BBBB##JJJJJJJ##----##----#BBBBBBBBB#----##----#JJJJJJJJJ#----#######BBBBTBBBB#######----#JJJJJJJJJ#----##----#BBBBBBBBB#----##----##JJJJJJJ##----##-----##BBBBB##-----##------#######--__--##--------M#X---_##_-##--------S#----_###_###--------#-----_#######-------#------_########################",
          remarks : "Druid",
          notes : "106K Druid",
          troop_count : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          res_count : [0, 0, 0, 0, 1, 575000, 575000, 575000, 575000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 575000, 575000, 575000, 575000]
        }, {
          name : "Tas 4sec Priests",
          string : "[ShareString.1.3];########################-------#-----BB#####--------#----BBBB###---------#----BZZZB##---------#----BBBBB##------#######-BZZZB##-----##BZBZB##BBBBB##----##ZBZBZBZ##----##----#BZBZBZBZB#SP--##----#BZBZBZBZB#SP--#######BZBZTZBZB#######----#BZBZBZBZB#JX--##----#BZBZBZBZB#----##----##ZBZBZBZ##----##-----##BZBZB##-----##------#######--__--##---------#----_##_-##---------#----_###_###--------#-----_#######-------#------_########################",
          remarks : "Priests",
          notes : "224000 Priests",
          troop_count : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          res_count : [0, 0, 0, 0, 1, 575000, 575000, 575000, 575000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 575000, 575000, 575000, 575000]
        }];
        /** @type {string} */
        var selectbuttsdf_ = '<select id="dfunkylayout" style="font-size: 10px !important;margin-top:1%;margin-left:2%;width:30%;" class="regButton greenb"><option value="0">Prefered build layout</option>';
        /** @type {number} */
        var ww_ = 1;
        var prefered_;
        for (prefered_ in prefered_data_) {
          console.log(prefered_data_[prefered_]);
          /** @type {string} */
          selectbuttsdf_ = selectbuttsdf_ + ('<option value="' + ww_ + '">' + prefered_data_[prefered_].name + "</option>");
          layoutdf_.push(prefered_data_[prefered_].string);
          remarkdf_.push(prefered_data_[prefered_].remarks);
          notedf_.push(prefered_data_[prefered_].notes);
          troopcound_.push(prefered_data_[prefered_].troop_count);
          resd_.push(prefered_data_[prefered_].res_count);
          ww_++;
        }
        /** @type {string} */
        selectbuttsdf_ = selectbuttsdf_ + "</select>";
        /** @type {string} */
        var selectbuttsw_ = '<select id="funkylayoutw" style="font-size: 10px !important;margin-top:1%;margin-left:2%;width:45%;" class="regButton greenb"><option value="0">Select water layout</option>';
        /** @type {number} */
        var cww_ = 1;
        /** @type {string} */
        selectbuttsw_ = selectbuttsw_ + ('<option value="' + cww_ + '">2 sec rang/galley</option>');
        layoutsw_.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##BGBGB##-----##----##GBGBGBG##----##----#BGBGBGBGB#----##----#BGBGBGBGB#---H#######BGBGTGBGB#######----#BGBGBGBGB#JSPX##----#BGBGBGBGB#----##----##GBGBGBG##G---##-----##BGGGB##BBBBG##------#######BBVVBB##---------#--GBV##VB##---------#--GBV###V###--------#---BBV#######-------#----BBV########################");
        remarksw_.push("rangers/triari/galley");
        notesw_.push("166600 inf and 334 galley @ 10 days");
        troopcounw_.push([0, 0, 83300, 83300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 334, 0, 0]);
        resw_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        cww_++;
        /** @type {string} */
        selectbuttsw_ = selectbuttsw_ + ('<option value="' + cww_ + '">6 sec arbs/galley</option>');
        layoutsw_.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##BEBEB##-----##----##EBEBEBE##----##----#BEBEBEBEB#----##----#BEBEBEBEB#----#######BEBETEBEB#######----#BEBEBEBEB#SPJX##----#BEBEBEBEB#MH--##----##EBEBEBE##----##-----##BEBEB##BBBB-##------#######BBVVBB##---------#---BVTTVB##---------#---BVTTTV###--------#--BBBVTT#####-------#--BEBBV########################");
        remarksw_.push("arbs/galley");
        notesw_.push("88300 inf and 354 galley @ 11.5 days");
        troopcounw_.push([0, 0, 0, 0, 0, 0, 0, 0, 88300, 0, 0, 0, 0, 0, 354, 0, 0]);
        resw_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        cww_++;
        /** @type {string} */
        selectbuttsw_ = selectbuttsw_ + ('<option value="' + cww_ + '">3 sec priestess/galley</option>');
        layoutsw_.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##BZBZB##-----##----##ZBZBZBZ##----##----#BZBZBZBZB#----##----#BZBZBZBZB#---H#######BZBZTZBZB#######----#BZBZBZBZB#JSPX##----#BZBZBZBZB#----##----##ZBZBZBZ##-Z--##-----##BZZZB##BBBBZ##------#######BBVVBB##---------#---BV##VB##---------#--ZBV###V###--------#---BBV#######-------#---ZBBV########################");
        remarksw_.push("priestess/galley");
        notesw_.push("166600 inf and 334 galley @ 11 days");
        troopcounw_.push([0, 0, 0, 0, 166600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 334, 0, 0]);
        resw_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        cww_++;
        /** @type {string} */
        selectbuttsw_ = selectbuttsw_ + ('<option value="' + cww_ + '">7 sec praetor/galley</option>');
        layoutsw_.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##BZBZB##-----##----##ZBZBZBZ##----##----#BZBZBZBZB#----##----#BZBZBZBZB#----#######BZBZTZBZB#######----#BZBZBZBZB#SPJX##----#BZBZBZBZB#MH--##----##ZBZBZBZ##----##-----##BZBZB##BBBBZ##------#######BBVVBB##---------#---BVTTVB##---------#---BVTTTV###--------#---BBVTT#####-------#--BZBBV########################");
        remarksw_.push("praetors/galley");
        notesw_.push("86650 praetors and 347 galley @ 12 days");
        troopcounw_.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 86650, 0, 0, 0, 0, 347, 0, 0]);
        resw_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        cww_++;
        /** @type {string} */
        selectbuttsw_ = selectbuttsw_ + ('<option value="' + cww_ + '">2 sec vanq/galley+senator</option>');
        layoutsw_.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##BGBGB##-----##----##BBGBGBB##----##----#BGBGBGBGB#----##----#BGBGBGBGB#---H#######BGBGTGBGB#######----#BGBGBGBGB#JSPX##----#BGBGBGBGB#----##----##BBGBGBB##---B##-----##BGBGB##BBBBZ##------#######BBVVBB##---------#---BV##VB##---------#---BV###V###--------#---BBV#######-------#--BBBBV########################");
        remarksw_.push("vanq/galley+senator");
        notesw_.push("193300 inf and 387 galley @ 10 days");
        troopcounw_.push([0, 0, 0, 0, 0, 193300, 0, 0, 0, 0, 0, 0, 0, 0, 387, 0, 0]);
        resw_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        cww_++;
        /** @type {string} */
        selectbuttsw_ = selectbuttsw_ + ('<option value="' + cww_ + '">5 sec horses/galley</option>');
        layoutsw_.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##BEBEB##-----##----##EBEBEBE##----##----#BEBEBEBEB#----##----#BEBEBEBEB#---H#######BEBETEBEB#######----#BEBEBEBEB#JSPX##----#BEBEBEBEB#-M--##----##EBEBEBB##----##-----##BEBEB##BBBB-##------#######BBVVBB##---------#---BV##VB##---------#---BV###V###--------#--BBBV#######-------#--BEBBV########################");
        remarksw_.push("horses/galley");
        notesw_.push("90000 cav and 360 galley @ 10.5 days");
        troopcounw_.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 90000, 0, 0, 0, 360, 0, 0]);
        resw_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        cww_++;
        /** @type {string} */
        selectbuttsw_ = selectbuttsw_ + ('<option value="' + cww_ + '">5 sec sorc/galley</option>');
        layoutsw_.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##JBJBJ##-----##----##BJBJBJB##----##----#JBJBJBJBJ#----##----#JBJBJBJBJ#---H#######JBJBTBJBJ#######----#JBJBJBJBJ#-S-X##----#JBJBJBJBJ#----##----##BJBJBJB##JJ--##-----##JBJBJ##BBBBJ##------#######BBVVBB##---------#--JBV##VB##---------#--JBV###V###--------#---BBV#######-------#---JBBV########################");
        remarksw_.push("sorc/galley");
        notesw_.push("156600 sorc and 314 galley @ 13.5 days");
        troopcounw_.push([0, 0, 0, 0, 0, 0, 156600, 0, 0, 0, 0, 0, 0, 0, 314, 0, 0]);
        resw_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        cww_++;
        /** @type {string} */
        selectbuttsw_ = selectbuttsw_ + ('<option value="' + cww_ + '">vanqs+ports+senator</option>');
        layoutsw_.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##BBBBB##-----##----##BBGBGBB##----##----#BGBGBGBGB#----##----#BGBBBBBGB#----#######BBBGTGBBB#######----#BGBBBBBGB#PPJX##----#BGBGBGBGB#BBBB##----##BBGBGBB##BBBB##-----##BBBBB##BBBBB##------#######-BRRBB##---------#----R##RZ##---------#----R###R###--------#----SR#######-------#----MSR########################");
        remarksw_.push("vanqs+senator+ports");
        notesw_.push("264k infantry @ 10 days");
        troopcounw_.push([0, 0, 0, 100000, 0, 164000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        resw_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        cww_++;
        /** @type {string} */
        selectbuttsw_ = selectbuttsw_ + ('<option value="' + cww_ + '">main hub</option>');
        layoutsw_.push("[ShareString.1.3];########################-------#-------#####--------#---PPPPP###---------#---PPPPPP##---------#---PPPPPP##------#######PPPPPP##-----##-----##PPPPP##----##SLSDSAS##PPPP##----#-SDSMSDS-#PPPP##----#-SLSMSAS-#PPPP#######-SDSTSDS-#######----#-SLSMSAS-#----##----#-SDSMSDS-#----##----##SLSDSAS##----##-----##-----##-----##------#######--RR--##---------#ZB--RTTR-##---------#PJ--RTTTR###--------#-----RTT#####-------#------R########################");
        remarksw_.push("main hub");
        notesw_.push("14 mil w/s 23 mil iron 15 mil food 8200 carts 240 boats");
        troopcounw_.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        resw_.push([0, 0, 0, 0, 1, 500000, 500000, 500000, 500000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 500000, 500000, 500000, 500000]);
        cww_++;
        /** @type {string} */
        selectbuttsw_ = selectbuttsw_ + ('<option value="' + cww_ + '">palace storage</option>');
        layoutsw_.push("[ShareString.1.3]:########################-------#-----PP#####--------#-----PPP###---------#-----PPPP##---------#-----PPPP##------#######--PPPP##-----##SASLS##-PPPP##----##ASASLSL##PPPP##----#SASASLSLS#-PPP##----#SASASLSLS#JPPP#######SASA#LSLS#######----#SASASLSLS#----##----#SASASLSLS#----##----##ASASLSL##----##-----##SASLS##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
        remarksw_.push("palace storage");
        notesw_.push("40 mil w/s 6200 carts");
        troopcounw_.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        resw_.push([0, 0, 0, 0, 1, 500000, 500000, 500000, 500000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 500000, 500000, 500000, 500000]);
        cww_++;
        /** @type {string} */
        selectbuttsw_ = selectbuttsw_ + ('<option value="' + cww_ + '">palace feeder</option>');
        layoutsw_.push("[ShareString.1.3];########################-PPPPPP#PPPPPPP#####--PPPPPP#PPPPPPPP###---PPPPPP#PPPPPPPPP##---PPPPPP#PPPPPPPPP##----PP#######PPPPPP##-----##----J##PPPPP##----##-A-----##PPPP##----#-SSS-----#PPPP##----#-AAA-----#PPPP#######-SSST----#######----#-LLL-----#----##----#-SSS-----#----##----##-L-----##----##-----##-----##-----##------#######--__--##---------#----_##_-##---------#----_###_###--------#-----_#######-------#------_########################");
        remarksw_.push("palace feeder");
        notesw_.push("8.75 mil w/s 16400 carts");
        troopcounw_.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        resw_.push([0, 0, 0, 0, 1, 500000, 500000, 500000, 500000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 500000, 500000, 500000, 500000]);
        cww_++;
        /** @type {string} */
        selectbuttsw_ = selectbuttsw_ + ('<option value="' + cww_ + '">palace Hub mixed</option>');
        layoutsw_.push("[ShareString.1.3];########################-------#PPPPPPP#####--------#PPPPPPPP###---------#PPPPPPPPP##---------#PPPPPPPPP##------#######PPPPPP##-----##-----##PPPPP##----##-------##PPPP##----#SLSASLSAS#PPPP##----#SASLSASLS#JPPP#######SLSATLSAS#######----#SASLSASLS#----##----#SLSASLSAS#----##----##-------##----##-----##-----##-----##------#######--__--##---------#----_TT_-##---------#----_TTT_###--------#-----_TT#####-------#------_########################");
        remarksw_.push("palace Hub mixed");
        notesw_.push("24.57 mil w/s 11000 carts");
        troopcounw_.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        resw_.push([0, 0, 0, 0, 1, 500000, 500000, 500000, 500000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 500000, 500000, 500000, 500000]);
        cww_++;
        /** @type {string} */
        selectbuttsw_ = selectbuttsw_ + ('<option value="' + cww_ + '">Stingers</option>');
        layoutsw_.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##-----##-----##----##-------##----##----#---------#----##----#---------#----#######----T----#######----#---------#SPHX##----#---------#-M--##----##-------##----##-----##-----##BBBB-##------#######BBVVBB##---------#---BVTTVB##---------#---BVTTTV###--------#---BBVTT#####-------#----BBV########################");
        remarksw_.push("stingers");
        notesw_.push("3480 stingers @ 84 days");
        troopcounw_.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3480, 0]);
        resw_.push([0, 0, 0, 0, 1, 500000, 500000, 500000, 500000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 500000, 500000, 500000, 500000]);
        cww_++;
        /** @type {string} */
        selectbuttsw_ = selectbuttsw_ + ('<option value="' + cww_ + '">Warships</option>');
        layoutsw_.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##-----##-----##----##-------##----##----#---------#----##----#---------#----#######----T----#######----#---------#SPHX##----#---------#-M--##----##-------##----##-----##-----##BBBB-##------#######BBVVBB##---------#---BVTTVB##---------#---BVTTTV###--------#---BBVTT#####-------#----BBV########################");
        remarksw_.push("warships");
        notesw_.push("870 warships @ 42 days");
        troopcounw_.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 870]);
        resw_.push([0, 0, 0, 0, 1, 500000, 500000, 500000, 500000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 500000, 500000, 500000, 500000]);
        /** @type {string} */
        selectbuttsw_ = selectbuttsw_ + "</select>";
        /** @type {string} */
        var selectbuttsl_ = '<select id="funkylayoutl" style="font-size: 10px !important;margin-top:1%;margin-left:2%;width:45%;" class="regButton greenb"><option value="0">Select land layout</option>';
        /** @type {number} */
        var ll_1 = 1;
        /** @type {!Array} */
        var land_locked_data_ = [{
          name : "1 sec vanqs",
          string : "[ShareString.1.3]:########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##GBGBG##-----##----##BGBGBGB##----##----#GBGBGBGBG#----##----#GBGBGBGBG#----#######GBGBTBGBG#######----#GBGBGBGBG#----##----#GBGBGBGBG#----##----##BGBGBGB##----##GGGGG##GBGBG##-----##BBBBB-#######------##GGGGGG--H#---------##BBBBBB--J#---------###GGGG---X#--------#####BB----S#-------########################",
          remarks : "vanqs",
          notes : "180000 vanqs @ 2 days",
          troop_count : [0, 0, 0, 0, 0, 180000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          res_count : [0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]
        }, {
          name : "2 sec vanqs",
          string : "[ShareString.1.3]:########################BBB--JX#-------#####BGBG--PP#--------###-BBBBB-MS#---------##-BGBGB--H#---------##-BGBGB#######------##-ZBB-##BBBBB##-----##----##BBGBGBB##----##----#BGBGBGBGB#----##----#BGBBBBBGB#----#######BGBGTGBGB#######----#BGBBBBBGB#----##----#BGBGBGBGB#----##----##BBGBGBB##----##-----##BBBBB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################",
          remarks : "vanqs",
          notes : "264000 vanqs @ 6 days",
          troop_count : [0, 0, 0, 0, 0, 264000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          res_count : [0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]
        }];
        var l_locked_;
        for (l_locked_ in land_locked_data_) {
          /** @type {string} */
          selectbuttsl_ = selectbuttsl_ + ('<option value="' + ll_1 + '">' + land_locked_data_[l_locked_].name + "</option>");
          layoutsl_.push(land_locked_data_[l_locked_].string);
          remarksl_.push(land_locked_data_[l_locked_].remarks);
          notesl_.push(land_locked_data_[l_locked_].notes);
          troopcounl_.push(land_locked_data_[l_locked_].troop_count);
          resl_.push(land_locked_data_[l_locked_].res_count);
          ll_1++;
        }
        /** @type {string} */
        selectbuttsl_ = selectbuttsl_ + ('<option value="' + ll_1 + '">3 sec vanqs raiding</option>');
        layoutsl_.push("[ShareString.1.3];########################----PJX#-------#####BB----PP#--------###BGBGB--SS#---------##BBBBB--MP#---------##BGBGB-#######------##BBBBB##BBBBB##-----##--G-##BBGBGBB##----##----#BBBBBBBBB#----##----#BGBGBGBGB#----#######BBBBTBBBB#######----#BGBGBGBGB#----##----#BBBBBBBBB#----##----##BBGBGBB##----##-----##BBBBB##-----##------#######--__--##---------#----_##_-##---------#----_###_###--------#-----_#######-------#------_########################");
        remarksl_.push("vanqs");
        notesl_.push("296000 vanqs @ 10 days");
        troopcounl_.push([0, 0, 0, 0, 0, 296000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        resl_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        ll_1++;
        /** @type {string} */
        selectbuttsl_ = selectbuttsl_ + ('<option value="' + ll_1 + '">2 sec rangers</option>');
        layoutsl_.push("[ShareString.1.3]:########################BB---JX#-------#####BGBGB-PP#--------###-BGBGB-MS#---------##-BGBGB--H#---------##-BGBGB#######------##--BBB##BGBGB##-----##----##BBGBGBB##----##----#BGBGBGBGB#----##----#BGBGBGBGB#----#######BGBGTGBGB#######----#BGBGBGBGB#----##----#BGBGBGBGB#----##----##BBGBGBB##----##-----##BBBBB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
        remarksl_.push("rangers/triari");
        notesl_.push("236000 inf @ 6.5 days");
        troopcounl_.push([0, 0, 186000, 50000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        resl_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        ll_1++;
        /** @type {string} */
        selectbuttsl_ = selectbuttsl_ + ('<option value="' + ll_1 + '">3 sec priests</option>');
        layoutsl_.push("[ShareString.1.3];########################-------#-----BB#####--------#----BBBB###---------#----BZZZB##---------#----BBBBB##------#######-BZZZB##-----##BZBZB##BBBBB##----##ZBZBZBZ##----##----#BZBZBZBZB#SP--##----#BZBZBZBZB#SP--#######BZBZTZBZB#######----#BZBZBZBZB#JX--##----#BZBZBZBZB#----##----##ZBZBZBZ##----##-----##BZBZB##-----##------#######--__--##---------#----_##_-##---------#----_###_###--------#-----_#######-------#------_########################");
        remarksl_.push("priests");
        notesl_.push("224000 inf @ 7.7 days");
        troopcounl_.push([0, 0, 224000, 50000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        resl_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        ll_1++;
        /** @type {string} */
        selectbuttsl_ = selectbuttsl_ + ('<option value="' + ll_1 + '">6 sec praetors</option>');
        layoutsl_.push("[ShareString.1.3]:########################BB---JX#-------#####BZBZB-PP#--------###-BZBZB-MS#---------##-BZBZB--H#---------##-BZBZB#######------##--BBB##BZBZB##-----##----##ZBZBZBZ##----##----#BZBZBZBZB#----##----#BZBZBZBZB#----#######BZBZTZBZB#######----#BZBZBZBZB#----##----#BZBZBZBZB#----##----##BBZBZBB##----##-----##BZBZB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
        remarksl_.push("praetors");
        notesl_.push("110000 praetors @ 7.5 days");
        troopcounl_.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 110000, 0, 0, 0, 0, 0, 0, 0]);
        resl_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        ll_1++;
        /** @type {string} */
        selectbuttsl_ = selectbuttsl_ + ('<option value="' + ll_1 + '">4 sec horses</option>');
        layoutsl_.push("[ShareString.1.3]:########################BB---JX#-------#####BEBEB-PP#--------###-BEBEB-MS#---------##-BEBEB--H#---------##-BEBEB#######------##--ZBB##BEBEB##-----##----##EBEBEBE##----##----#BEBEBEBEB#----##----#BEBEBEBEB#----#######BEBETEBEB#######----#BEBEBEBEB#----##----#BEBEBEBEB#----##----##BBEBEBE##----##-----##BEBEB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
        remarksl_.push("horses");
        notesl_.push("106000 horses @ 5 days");
        troopcounl_.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 106000, 0, 0, 0, 0, 0, 0]);
        resl_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        ll_1++;
        /** @type {string} */
        selectbuttsl_ = selectbuttsl_ + ('<option value="' + ll_1 + '">5 sec horses</option>');
        layoutsl_.push("[ShareString.1.3]:########################-B---JX#-------#####BEBEB-PP#--------###-BEBEB-MS#---------##-BEBEB-PH#---------##-BEBEB#######------##--BBB##BBBBB##-----##----##BBEBEBB##----##----#BEBEBEBEB#----##----#BEBEBEBEB#----#######BEBBTBBEB#######----#BEBEBEBEB#----##----#BEBEBEBEB#----##----##BBEBEBB##----##-----##BBBBB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
        remarksl_.push("horses");
        notesl_.push("124000 horses @ 7 days");
        troopcounl_.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124000, 0, 0, 0, 0, 0, 0]);
        resl_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        ll_1++;
        /** @type {string} */
        selectbuttsl_ = selectbuttsl_ + ('<option value="' + ll_1 + '">5 sec arbs</option>');
        layoutsl_.push("[ShareString.1.3]:########################BB---JX#-------#####BEBEB-PP#--------###-BEBEB-MS#---------##-BEBEB--H#---------##-BEBEB#######------##--BBB##BEBEB##-----##----##EBEBEBE##----##----#BEBEBEBEB#----##----#BEBEBEBEB#----#######BEBETEBEB#######----#BEBEBEBEB#----##----#BEBEBEBEB#----##----##BBEBEBB##----##-----##BEBEB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
        remarksl_.push("arbs");
        notesl_.push("110000 arbs @ 6.5 days");
        troopcounl_.push([0, 0, 0, 0, 0, 0, 0, 0, 110000, 0, 0, 0, 0, 0, 0, 0, 0]);
        resl_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        ll_1++;
        /** @type {string} */
        selectbuttsl_ = selectbuttsl_ + ('<option value="' + ll_1 + '">6 sec arbs</option>');
        layoutsl_.push("[ShareString.1.3]:########################BB---JX#-------#####BEBEB-PP#--------###-BBBEB-MS#---------##-BEBEB--H#---------##-BEBEB#######------##--BBB##BBBBB##-----##----##BBEBEBB##----##----#BEBEBEBEB#----##----#BEBEBEBEB#----#######BEBETEBEB#######----#BEBEBEBEB#----##----#BEBEBEBEB#----##----##BBEBEBB##----##-----##BBBBB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
        remarksl_.push("arbs");
        notesl_.push("124000 arbs @ 8.5 days");
        troopcounl_.push([0, 0, 0, 0, 0, 0, 0, 0, 124000, 0, 0, 0, 0, 0, 0, 0, 0]);
        resl_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        ll_1++;
        /** @type {string} */
        selectbuttsl_ = selectbuttsl_ + ('<option value="' + ll_1 + '">4 sec sorc</option>');
        layoutsl_.push("[ShareString.1.3]:########################BJBJ--X#-------#####JBJBJ--S#--------###-JBJBJ--M#---------##-JBJBJ--H#---------##-JBJBJ#######------##-ZBJB##JBJBJ##-----##----##BJBJBJB##----##----#JBJBJBJBJ#----##----#JBJBJBJBJ#----#######JBJBTBJBJ#######----#JBJBJBJBJ#----##----#JBJBJBJBJ#----##----##BJBJBJB##----##-----##JBJBJ##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
        remarksl_.push("sorc");
        notesl_.push("176000 sorc @ 8 days");
        troopcounl_.push([0, 0, 0, 0, 0, 0, 176000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        resl_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        ll_1++;
        /** @type {string} */
        selectbuttsl_ = selectbuttsl_ + ('<option value="' + ll_1 + '">5 sec sorc</option>');
        layoutsl_.push("[ShareString.1.3]:########################BBB---X#-------#####BJBJB--P#--------###-BJBJB-MS#---------##-BJBJB--H#---------##-BJBJB#######------##-ZBBB##BJBJB##-----##----##JBJBJBJ##----##----#BJBJBJBJB#----##----#BJBJBJBJB#----#######BJBJTJBJB#######----#BJBJBJBJB#----##----#BJBJBJBJB#----##----##BBJBJBB##----##-----##BJBJB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
        remarksl_.push("sorc");
        notesl_.push("224000 sorc @ 13 days");
        troopcounl_.push([0, 0, 0, 0, 0, 0, 224000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        resl_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        ll_1++;
        /** @type {string} */
        selectbuttsl_ = selectbuttsl_ + ('<option value="' + ll_1 + '">10 sec druids</option>');
        layoutsl_.push("[ShareString.1.3]:########################-J----X#-------#####JBJB--MS#--------###BJBJB---H#---------##BJBJB----#---------##BJBJB-#######------##BJBJB##BJBJB##-----##-JBJ##JBJBJBJ##----##----#BJBJBJBJB#----##----#BJBJBJBJB#----#######BJBJTJBJB#######----#BJBJBJBJB#----##----#BJBJBJBJB#----##----##JBJBJBJ##----##-----##BJBJB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
        remarksl_.push("druids");
        notesl_.push("102000 druids @ 12 days");
        troopcounl_.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 102000, 0, 0, 0, 0, 0]);
        resl_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        ll_1++;
        /** @type {string} */
        selectbuttsl_ = selectbuttsl_ + ('<option value="' + ll_1 + '">scorp/rams</option>');
        layoutsl_.push("[ShareString.1.3]:########################BBYB--X#-------#####BYBYB---#--------###-BYBYB-MS#---------##-BYBYB--H#---------##-BYBYB#######------##-BYBB##BYBYB##-----##----##YBYBYBY##----##----#BYBYBYBYB#----##----#BYBYBYBYB#----#######BYBYTYBYB#######----#BYBYBYBYB#----##----#BYBYBYBYB#----##----##YBYBYBY##----##-----##BYBYB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
        remarksl_.push("scorp/rams");
        notesl_.push("21600 siege engines @ 7.5 days");
        troopcounl_.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5500, 16100, 0, 0, 0]);
        resl_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        ll_1++;
        /** @type {string} */
        selectbuttsl_ = selectbuttsl_ + ('<option value="' + ll_1 + '">ballista</option>');
        layoutsl_.push("[ShareString.1.3]:########################BBBB--X#-------#####BYBYB---#--------###-BYBYB-MS#---------##-BYBYB--H#---------##-BYBYB#######------##-BBBB##BBBBB##-----##----##BBYBYBB##----##----#BYBYBYBYB#----##----#BYBYBYBYB#----#######BYBYTYBYB#######----#BYBYBYBYB#----##----#BYBYBYBYB#----##----##BBYBYBB##----##-----##BBBBB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
        remarksl_.push("ballista");
        notesl_.push("25600 siege engines @ 10.5 days");
        troopcounl_.push([0, 25600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        resl_.push([0, 0, 0, 0, 1, 150000, 220000, 150000, 350000, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 150000, 220000, 150000, 350000]);
        /** @type {string} */
        selectbuttsl_ = selectbuttsl_ + "</select>";
        $("#removeoverlayGo").after(selectbuttsdf_);
        $("#dfunkylayout").after(selectbuttsl_);
        $("#funkylayoutl").after(selectbuttsw_);
        $("#funkylayoutl").change(function() {
          var newlayout_ = currentlayout_;
          /** @type {number} */
          var j_12 = 1;
          for (; j_12 < layoutsl_.length; j_12++) {
            if ($("#funkylayoutl").val() == j_12) {
              /** @type {number} */
              var i_54 = 20;
              for (; i_54 < currentlayout_.length; i_54++) {
                var tmpchar_1 = layoutsl_[j_12].charAt(i_54);
                /** @type {!RegExp} */
                var cmp_1 = new RegExp(tmpchar_1);
                if (!cmp_1.test(emptyspots_)) {
                  newlayout_ = newlayout_.replaceAt(i_54, tmpchar_1);
                }
              }
              $("#overlaytextarea").val(newlayout_);
              setTimeout(function() {
                jQuery("#applyoverlayGo")[0].click();
              }, 300);
              if ($("#addnotes").prop("checked") == true) {
                $("#CNremarks").val(remarksl_[j_12]);
                $("#citynotestextarea").val(notesl_[j_12]);
                setTimeout(function() {
                  jQuery("#citnotesaveb")[0].click();
                }, 100);
              }
              var aa_7 = city_.mo;
              if ($("#addtroops").prop("checked") == true) {
                var k_3;
                for (k_3 in troopcounl_[j_12]) {
                  aa_7[9 + Number(k_3)] = troopcounl_[j_12][k_3];
                }
              }
              if ($("#addwalls").prop("checked") == true) {
                /** @type {number} */
                aa_7[26] = 1;
              }
              if ($("#addtowers").prop("checked") == true) {
                /** @type {number} */
                aa_7[27] = 1;
              }
              if ($("#addhub").prop("checked") == true) {
                var hubs_2 = {
                  cid : [],
                  distance : []
                };
                $.each(clc_, function(key_56, value_104) {
                  if (key_56 == $("#selHub").val()) {
                    /** @type {number} */
                    hubs_2.cid = value_104;
                  }
                });
                for (i_54 in hubs_2.cid) {
                  /** @type {number} */
                  var tempx_11 = Number(hubs_2.cid[i_54] % 65536);
                  /** @type {number} */
                  var tempy_11 = Number((hubs_2.cid[i_54] - tempx_11) / 65536);
                  hubs_2.distance.push(Math.sqrt((tempx_11 - city_.x) * (tempx_11 - city_.x) + (tempy_11 - city_.y) * (tempy_11 - city_.y)));
                }
                /** @type {number} */
                var mindist_2 = Math.min.apply(Math, hubs_2.distance);
                var nearesthub_2 = hubs_2.cid[hubs_2.distance.indexOf(mindist_2)];
                resl_[j_12][14] = nearesthub_2;
                resl_[j_12][15] = nearesthub_2;
              } else {
                /** @type {number} */
                resl_[j_12][14] = 0;
                /** @type {number} */
                resl_[j_12][15] = 0;
              }
              if ($("#addres").prop("checked") == true) {
                resl_[j_12][5] = $("#woodin").val();
                resl_[j_12][6] = $("#stonein").val();
                resl_[j_12][7] = $("#ironin").val();
                resl_[j_12][8] = $("#foodin").val();
                resl_[j_12][19] = $("#woodin").val();
                resl_[j_12][20] = $("#stonein").val();
                resl_[j_12][21] = $("#ironin").val();
                resl_[j_12][22] = $("#foodin").val();
                for (k_3 in resl_[j_12]) {
                  aa_7[28 + Number(k_3)] = resl_[j_12][k_3];
                }
              }
              if ($("#addbuildings").prop("checked") == true) {
                /** @type {!Array} */
                aa_7[51] = [1, $("#cablev").val()];
                /** @type {number} */
                aa_7[1] = 1;
              }
              var dat_15 = {
                a : JSON.stringify(aa_7),
                b : cdata_.cid
              };
              jQuery.ajax({
                url : "includes/mnio.php",
                type : "POST",
                async: false,
                data : dat_15
              });
            }
          }
        });
        $("#funkylayoutw").change(function() {
          var newlayout_1 = currentlayout_;
          /** @type {number} */
          var j_13 = 1;
          for (; j_13 < layoutsw_.length; j_13++) {
            if ($("#funkylayoutw").val() == j_13) {
              /** @type {number} */
              var i_55 = 20;
              for (; i_55 < currentlayout_.length; i_55++) {
                var tmpchar_2 = layoutsw_[j_13].charAt(i_55);
                /** @type {!RegExp} */
                var cmp_2 = new RegExp(tmpchar_2);
                if (!cmp_2.test(emptyspots_)) {
                  newlayout_1 = newlayout_1.replaceAt(i_55, tmpchar_2);
                }
              }
              $("#overlaytextarea").val(newlayout_1);
              setTimeout(function() {
                jQuery("#applyoverlayGo")[0].click();
              }, 300);
              if ($("#addnotes").prop("checked") == true) {
                $("#CNremarks").val(remarksw_[j_13]);
                $("#citynotestextarea").val(notesw_[j_13]);
                setTimeout(function() {
                  jQuery("#citnotesaveb")[0].click();
                }, 100);
              }
              var aa_8 = city_.mo;
              if ($("#addtroops").prop("checked") == true) {
                var k_4;
                for (k_4 in troopcounw_[j_13]) {
                  aa_8[9 + Number(k_4)] = troopcounw_[j_13][k_4];
                }
              }
              if ($("#addwalls").prop("checked") == true) {
                /** @type {number} */
                aa_8[26] = 1;
              }
              if ($("#addtowers").prop("checked") == true) {
                /** @type {number} */
                aa_8[27] = 1;
              }
              if ($("#addhub").prop("checked") == true) {
                var hubs_3 = {
                  cid : [],
                  distance : []
                };
                $.each(clc_, function(key_57, value_105) {
                  if (key_57 == $("#selHub").val()) {
                    /** @type {number} */
                    hubs_3.cid = value_105;
                  }
                });
                for (i_55 in hubs_3.cid) {
                  /** @type {number} */
                  var tempx_12 = Number(hubs_3.cid[i_55] % 65536);
                  /** @type {number} */
                  var tempy_12 = Number((hubs_3.cid[i_55] - tempx_12) / 65536);
                  hubs_3.distance.push(Math.sqrt((tempx_12 - city_.x) * (tempx_12 - city_.x) + (tempy_12 - city_.y) * (tempy_12 - city_.y)));
                }
                /** @type {number} */
                var mindist_3 = Math.min.apply(Math, hubs_3.distance);
                var nearesthub_3 = hubs_3.cid[hubs_3.distance.indexOf(mindist_3)];
                resw_[j_13][14] = nearesthub_3;
                resw_[j_13][15] = nearesthub_3;
              } else {
                /** @type {number} */
                resw_[j_13][14] = 0;
                /** @type {number} */
                resw_[j_13][15] = 0;
              }
              if ($("#addres").prop("checked") == true) {
                resw_[j_13][5] = $("#woodin").val();
                resw_[j_13][6] = $("#stonein").val();
                resw_[j_13][7] = $("#ironin").val();
                resw_[j_13][8] = $("#foodin").val();
                resw_[j_13][19] = $("#woodin").val();
                resw_[j_13][20] = $("#stonein").val();
                resw_[j_13][21] = $("#ironin").val();
                resw_[j_13][22] = $("#foodin").val();
                for (k_4 in resw_[j_13]) {
                  aa_8[28 + Number(k_4)] = resw_[j_13][k_4];
                }
              }
              if ($("#addbuildings").prop("checked") == true) {
                /** @type {!Array} */
                aa_8[51] = [1, $("#cablev").val()];
                /** @type {number} */
                aa_8[1] = 1;
              }
              var dat_16 = {
                a : JSON.stringify(aa_8),
                b : cdata_.cid
              };
              jQuery.ajax({
                url : "includes/mnio.php",
                type : "POST",
                async: false,
                data : dat_16
              });
            }
          }
        });
        $("#dfunkylayout").change(function() {
          var newlayout_2 = currentlayout_;
          /** @type {number} */
          var j_14 = 1;
          for (; j_14 < layoutdf_.length; j_14++) {
            if ($("#dfunkylayout").val() == j_14) {
              /** @type {number} */
              var i_56 = 20;
              for (; i_56 < currentlayout_.length; i_56++) {
                var tmpchar_3 = layoutdf_[j_14].charAt(i_56);
                /** @type {!RegExp} */
                var cmp_3 = new RegExp(tmpchar_3);
                if (!cmp_3.test(emptyspots_)) {
                  newlayout_2 = newlayout_2.replaceAt(i_56, tmpchar_3);
                }
              }
              $("#overlaytextarea").val(newlayout_2);
              setTimeout(function() {
                jQuery("#applyoverlayGo")[0].click();
              }, 300);
              if ($("#addnotes").prop("checked") == true) {
                $("#CNremarks").val(remarkdf_[j_14]);
                $("#citynotestextarea").val(notedf_[j_14]);
                setTimeout(function() {
                  jQuery("#citnotesaveb")[0].click();
                }, 100);
              }
              var aa_9 = city_.mo;
              if ($("#addtroops").prop("checked") == true) {
                var k_5;
                for (k_5 in troopcound_[j_14]) {
                  aa_9[9 + Number(k_5)] = troopcound_[j_14][k_5];
                }
              }
              if ($("#addwalls").prop("checked") == true) {
                /** @type {number} */
                aa_9[26] = 1;
              }
              if ($("#addtowers").prop("checked") == true) {
                /** @type {number} */
                aa_9[27] = 1;
              }
              if ($("#addhub").prop("checked") == true) {
                var hubs_4 = {
                  cid : [],
                  distance : []
                };
                $.each(clc_, function(key_58, value_106) {
                  if (key_58 == $("#selHub").val()) {
                    /** @type {number} */
                    hubs_4.cid = value_106;
                  }
                });
                for (i_56 in hubs_4.cid) {
                  /** @type {number} */
                  var tempx_13 = Number(hubs_4.cid[i_56] % 65536);
                  /** @type {number} */
                  var tempy_13 = Number((hubs_4.cid[i_56] - tempx_13) / 65536);
                  hubs_4.distance.push(Math.sqrt((tempx_13 - city_.x) * (tempx_13 - city_.x) + (tempy_13 - city_.y) * (tempy_13 - city_.y)));
                }
                /** @type {number} */
                var mindist_4 = Math.min.apply(Math, hubs_4.distance);
                var nearesthub_4 = hubs_4.cid[hubs_4.distance.indexOf(mindist_4)];
                resd_[j_14][14] = nearesthub_4;
                resd_[j_14][15] = nearesthub_4;
              } else {
                /** @type {number} */
                resd_[j_14][14] = 0;
                /** @type {number} */
                resd_[j_14][15] = 0;
              }
              if ($("#addres").prop("checked") == true) {
                resd_[j_14][5] = $("#woodin").val();
                resd_[j_14][6] = $("#stonein").val();
                resd_[j_14][7] = $("#ironin").val();
                resd_[j_14][8] = $("#foodin").val();
                for (k_5 in resd_[j_14]) {
                  aa_9[28 + Number(k_5)] = resd_[j_14][k_5];
                }
              }
              if ($("#addbuildings").prop("checked") == true) {
                /** @type {!Array} */
                aa_9[51] = [1, $("#cablev").val()];
                /** @type {number} */
                aa_9[1] = 1;
              }
              var dat_17 = {
                a : JSON.stringify(aa_9),
                b : cdata_.cid
              };
              jQuery.ajax({
                url : "includes/mnio.php",
                type : "POST",
                async: false,
                data : dat_17
              });
            }
          }
        });
      }, 500);
    });
  });
  function GetCarry() {
    var rv = localStorage.getItem('carry');
    return rv != null ? rv : 1.02;
  }
  })();


