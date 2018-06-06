var HttpRequest = require("nebulas").HttpRequest;
var Neb = require("nebulas").Neb;
var Account = require("nebulas").Account;
var Transaction = require("nebulas").Transaction;
var Unit = require("nebulas").Unit;
var neb = new Neb();
neb.setRequest(new HttpRequest("https://mainnet.nebulas.io"));

var NebPay = require("nebpay");   
var nebPay = new NebPay();
var dappAddress = "n1qcMJ6zeU6ujaW8UPLBCwYLnEtx8q3fK3a";


$('.popup').magnificPopup({
  type:'inline',
  fixedContentPos: true, 
  mainClass: 'mfp-fade',      
  showCloseBtn: true,
  closeOnBgClick: false
});   
$('.transaction').magnificPopup({
  type:'inline',
  fixedContentPos: true, 
  mainClass: 'mfp-fade',      
  showCloseBtn: true,
  closeOnBgClick: false
});   

window.onload = function(){         
  if(typeof(webExtensionWallet) === "undefined"){     
        $(".noExtension").show();   
        $(".content").hide();
    }else{
    }
};  

$(document).ready(function(){
    var to = dappAddress;
    var value = 0;    
    var callArgs = "[]";        
    var callFunction2 = 'readFavorite';
    nebPay.simulateCall(to, value, callFunction2, callArgs, { 
      listener: cbFavorite              
    });        
})

var indexes = [];

function cbFavorite(resp) {
  console.log('TYPEOF FAVORITE ' + typeof(resp));    
  console.log('RESULT FAVORITE ' + resp);
  console.log('RESULT FAVORITE ' + JSON.stringify(resp));  
  indexes = [];
  try {
    var real_parse = JSON.parse(resp.result);   
  } catch (resp) {        
    var to = dappAddress;
    var value = 0;
    var callFunction = 'read';
    var callArgs = "[]";    
    nebPay.simulateCall(to, value, callFunction, callArgs, { 
      listener: cbRead              
    });    
    return false;
  };     
  $.each(real_parse.reverse(),function(index,value){    
    indexes.push(real_parse[index].id);
  });

  var to = dappAddress;
  var value = 0;
  var callFunction = 'read';
  var callArgs = "[]";    
  nebPay.simulateCall(to, value, callFunction, callArgs, { 
    listener: cbRead              
  });    

}

function cbRead(resp) {
  console.log('TYPEOF ' + typeof(resp));    
  console.log('RESULT ' + resp);
  console.log('RESULT ' + JSON.stringify(resp));
  try {
    var real_parse = JSON.parse(resp.result);   
  } catch (err) {
    return false;
  }      
  $('.contests .row').html('');
  $.each(real_parse.reverse(),function(index,value){
    var value_for_fav = real_parse[index].id;
    var bool_heart = false;
    $.each(indexes,function(index,value){
      if (indexes[index] == value_for_fav) {
        bool_heart = true;
      }
    });

    var date_output = new Date(real_parse[index].deadline);
    var date_output_year = date_output.getFullYear();
    var date_output_month = date_output.getMonth();
    var date_output_date = date_output.getDate();
    date_output = date_output_date + '-' + date_output_month + '-' + date_output_year;        
    var distribut = '';
    if (real_parse[index].status == 'complete(the prize is distributed among the participants)') { 
      distribut = 'distribut'; } else { distribut = real_parse[index].status }
    
    if (bool_heart) {      
      $('.contests .row').append('<div data-id="' + real_parse[index].id + '" class="contest ' + distribut  + '"><a href="#"><h3>' + real_parse[index].name + '</h3></a><p class="descr_short">' + real_parse[index].description + '</p><span class="category">' + real_parse[index].category + '</span><span class="cost">' + (real_parse[index].prize/1000000000000000000) + '</span><span class="deadline" title="deadline">' + date_output + '</span><a href="#" class="heart"><img class="favorite" src="img/heart.png"></a><div class="wokrs"></div> <div class="item_tender winner"><span class="adress">from: ' + JSON.stringify(real_parse[index].winner.from) + '</span><p class="text">' + JSON.stringify(real_parse[index].winner.text) + '</p><div class="likes"><a href="#" class="like"><img src="img/like.png" alt=""></a><span class="count">' + JSON.stringify(real_parse[index].winner.like) + '</span></div></div> </div>')      
      $.each(real_parse[index].works, function(indexworks,value){                
        // $('.contests .row .contest:last-child').find('.wokrs').append('<div class="data_data"><span class="text-data">' + JSON.stringify(real_parse[index].works[indexworks].text) + '</span><span class="from_data"> ' + JSON.stringify(real_parse[index].works[indexworks].from) + ' </span><span class="like_data"> ' + JSON.stringify(real_parse[index].works[indexworks].like) + ' </span></div>"');        
        $('.contests .row .contest:last-child').find('.wokrs').append('<div data-id-work="' + indexworks + '" class="item_tender admin"><span class="adress">from: ' + JSON.stringify(real_parse[index].works[indexworks].from) + '</span><p class="text">' + JSON.stringify(real_parse[index].works[indexworks].text) + '</p><div class="decision"><a href="#"><button class="accept">Accept</button></a><a href="#"><button class="decline">Delete</button></a></div><div class="likes"><a href="#" class="like"><img src="img/like.png" alt=""></a><span class="count">' + JSON.stringify(real_parse[index].works[indexworks].like) + '</span></div></div>');        
      })
    } else {      
      $('.contests .row').append('<div data-id="' + real_parse[index].id + '" class="contest ' + distribut + '"><a href="#"><h3>' + real_parse[index].name + '</h3></a><p class="descr_short">' + real_parse[index].description + '</p><span class="category">' + real_parse[index].category + '</span><span class="cost">' + (real_parse[index].prize/1000000000000000000) + '</span><span class="deadline" title="deadline">' + date_output + '</span><a href="#" class="heart"><img src="img/heart_gray.png"></a><div class="wokrs"></div>  <div class="item_tender winner"><span class="adress">from: ' + JSON.stringify(real_parse[index].winner.from) + '</span><p class="text">' + JSON.stringify(real_parse[index].winner.text) + '</p><div class="likes"><a href="#" class="like"><img src="img/like.png" alt=""></a><span class="count">' + JSON.stringify(real_parse[index].winner.like) + '</span></div></div> </div>')
      $.each(real_parse[index].works, function(indexworks,value){
      // $('.contests .row .contest:last-child').find('.wokrs').append('<div class="data_data"><span class="text-data">' + JSON.stringify(real_parse[index].works[indexworks].text) + '</span><span class="from_data"> ' + JSON.stringify(real_parse[index].works[indexworks].from) + ' </span><span class="like_data"> ' + JSON.stringify(real_parse[index].works[indexworks].like) + ' </span></div>"');
      $('.contests .row .contest:last-child').find('.wokrs').append('<div data-id-work="' + indexworks + '" class="item_tender admin"><span class="adress">from: ' + JSON.stringify(real_parse[index].works[indexworks].from) + '</span><p class="text">' + JSON.stringify(real_parse[index].works[indexworks].text) + '</p><div class="decision"><a href="#"><button class="accept">Accept</button></a><a href="#"><button class="decline">Delete</button></a></div><div class="likes"><a href="#" class="like"><img src="img/like.png" alt=""></a><span class="count">' + JSON.stringify(real_parse[index].works[indexworks].like) + '</span></div></div>');
    })
    }      

  });
  $('.heart img').hover(function(){
    if ($(this).hasClass('favorite')) {
      $(this).attr('src','./img/heart_gray.png');      
    } else {
      $(this).attr('src','./img/heart.png');
    }              
  },function(){
    if ($(this).hasClass('favorite')) {
      $(this).attr('src','./img/heart.png');      
    } else {
      $(this).attr('src','./img/heart_gray.png');      
    }        
  })

  $('.heart img').click(function(){
    $(this).toggleClass('favorite');
  })

  $('.contest h3').click(function(){
    var name = $(this).text();      
    var id_tender = $(this).parent().parent().attr('data-id');
    var desc = $(this).parent().parent().find('.descr_short').text();      
    var category = $(this).parent().parent().find('.category').text();      
    var price = $(this).parent().parent().find('.cost').text();      
    var deadline = $(this).parent().parent().find('.deadline').text();            
    var favorite = false;
    var works = $(this).parent().parent().find('.wokrs').clone();
    var winner = $(this).parent().parent().find('.winner').clone();
    $(works).removeClass('wokrs');
    $(winner).removeClass('winner');
    if ($(this).parent().parent().find('.heart img').hasClass('favorite')) {
      favorite = true;
    };

    // chooseWinner: function (idP,idW)
        var to = dappAddress;
        var value = 0;
        var id_works = 0;        
        var args = [];
        args.push(id_tender);
        args.push(id_works);
        var callArgs = JSON.stringify(args);   
        var callFunction2 = 'chooseWinner';        
        nebPay.simulateCall(to, value, callFunction2, callArgs, { 
              listener: cbSubmit
            });        
    $('.content').hide();
    $('.tender_wrap').show();      
    $('.tender_wrap .tender .descr_full').html(desc);
    $('.tender_wrap .tender h2').html(name);
    $('.tender_wrap .tender').attr('data-id', id_tender);
    $('.tender_wrap .tender .category').html(category);
    $('.tender_wrap .tender .cost').html(price);
    $('.tender_wrap .tender .deadline').html(deadline);
    $('.tender_wrap .result_winner').html('');
    if ($(this).parent().parent().hasClass('complete')){
      $('.tender_wrap .result_winner').html('<h2>Winner</h2>');
      $('.tender_wrap .result_winner').append(winner);      
    } else if ($(this).parent().parent().hasClass('distribut')) {
      $('.tender_wrap .result_winner').append('<div class="result_winner res_dist"><h2>Result</h2><h3>The money was distributed among all participants of the tender</h3></div>');      
    } else {}
    $('.tender_wrap .resposnses').html('<h2>Tenderers</h2>');
    $('.tender_wrap .resposnses').append(works); 

    acceptDecline();
    buttonDist();
    $('.like').click(function(){
      // like: function (idP,idW)
      var to = dappAddress;
      var value = 0;
      var id_works = $(this).parent().parent().attr('data-id-work');
      var id_tender = $('.tender_wrap .tender').attr('data-id');
      var args = [];
      args.push(id_tender);
      args.push(id_works);
      var callArgs = JSON.stringify(args);   
      var callFunction2 = 'like';
      nebPay.call(to, value, callFunction2, callArgs, { 
        listener: cbAdd
      });

    })
  })

  $('.contest .heart').click(function(){
    // push: function (id)
    var to = dappAddress;
    var value = 0;
    var callFunction = 'addFavorite';
    var id = $(this).parent().attr('data-id');  
    var args = [];
    args.push(id);
    var callArgs = JSON.stringify(args);    
    nebPay.call(to, value, callFunction, callArgs, { 
      listener: cbAdd              
    });  
  })
}


function cbAdd(resp) {
  console.log(JSON.stringify(resp));
    hash_value = resp.txhash;    

    if (resp.txhash == undefined) {
     } else {
       $('.transaction').trigger('click');
      $('.hash').html('txHash: <p>' + hash_value + '</p>');     
    } 

    var reload_trans = setInterval(function(){
      neb.api.getTransactionReceipt({hash: hash_value}).then(function(receipt) {
        console.log('recepient: ' + JSON.stringify(receipt));
        result_trans = receipt.status;
        console.log('doing doing ');
        if (result_trans == 1) {
          $('#transaction .status_trans').html('<p style="color: green"> sucess </p>');                                  
          setTimeout(function(){ $('#transaction button').trigger('click') } , 2000);                    
          clearInterval(reload_trans);          
            var to = dappAddress;
            var value = 0;
            var callFunction = 'read';
            var callArgs = "[]";    
            nebPay.simulateCall(to, value, callFunction, callArgs, { 
              listener: cbRead              
            });    
            $('.your_word').val('');
        } else if (result_trans == 2) {
          $('#transaction .status_trans').html('<p style="color: blue"> pending </p>');
        } else {
          $('#transaction .status_trans').html('<p style="color: red"> fail </p>');                        
          setTimeout(function(){ $('#transaction button').trigger('click') } , 2000);          
          clearInterval(reload_trans);          
        }
    })}, 1000);    
}

$('.heart img').hover(function(){
  if ($(this).hasClass('favorite')) {    
    $(this).attr('src','./img/heart.png');
  } else {    
    $(this).attr('src','./img/heart_gray.png');  
  }      
  },function(){
    if ($(this).hasClass('favorite')) {
      $(this).attr('src','./img/heart_gray.png');      
    } else {
      $(this).attr('src','./img/heart.png');
    }        
})

$('.heart img').click(function(){
  $(this).toggleClass('favorite');
})

$('#add .send').click(function(){
  // push: function (name,description,deadline,category)
  var to = dappAddress;
  var value = $('#add .cost').val();
  var callFunction = 'push';
  var name = $('#add .name').val();
  var desc = $('#add #descr').val();
  var deadline = $('#add .deadline').val();
  var date_test = new Date(deadline).getTime();  
  var category = $('#add #by_category').val();   
  var args = [];
  args.push(name);
  args.push(desc);
  args.push(date_test);
  args.push(category);
  var callArgs = JSON.stringify(args);    
  nebPay.call(to, value, callFunction, callArgs, { 
    listener: cbAdd              
  });  
})

$('.favorites_tab').click(function(){
  var to = dappAddress;
  var value = 0;
  var callArgs = "[]";   
  var callFunction2 = 'readFavorite';
    nebPay.simulateCall(to, value, callFunction2, callArgs, { 
      listener: cbFavoriteTab             
    }); 
})

$('.tenders_tab').click(function(){
  var to = dappAddress;
  var value = 0;    
  var callArgs = "[]";        
  var callFunction2 = 'readFavorite';
  nebPay.simulateCall(to, value, callFunction2, callArgs, { 
    listener: cbFavorite              
  });        
})

function cbMyTenders(resp) {
  try {
    var real_parse = JSON.parse(resp.result);   
  } catch (err) {
    return false;
  }      
  $('.contests .row').html('');
  $.each(real_parse.reverse(),function(index,value){
    var date_output = new Date(real_parse[index].deadline);    
    var date_output_year = date_output.getFullYear();
    var date_output_month = date_output.getMonth();
    var date_output_date = date_output.getDate();
    date_output = date_output_date + '-' + date_output_month + '-' + date_output_year;        
    var distribut = '';
    if (real_parse[index].status == 'complete(the prize is distributed among the participants)') { 
      distribut = 'distribut'; } else { distribut = real_parse[index].status }
    $('.contests .row').append('<div data-id="' + real_parse[index].id + '" class="contest ' + distribut + '"><a href="#"><h3>' + real_parse[index].name + '</h3></a><p class="descr_short">' + real_parse[index].description + '</p><span class="category">' + real_parse[index].category + '</span><span class="cost">' + (real_parse[index].prize/1000000000000000000) + '</span><span class="deadline" title="deadline">' + date_output + '</span><a href="#" class="heart"><img class="favorite" src="img/heart_gray.png"></a><div class="wokrs"></div></div>')      
    $.each(real_parse[index].works, function(indexworks,value){        
      // $('.contests .row .contest:last-child').find('.wokrs').append('<div class="data_data"><span class="text-data">' + JSON.stringify(real_parse[index].works[indexworks].text) + '</span><span class="from_data"> ' + JSON.stringify(real_parse[index].works[indexworks].from) + ' </span><span class="like_data"> ' + JSON.stringify(real_parse[index].works[indexworks].like) + ' </span></div>"');        
      $('.contests .row .contest:last-child').find('.wokrs').append('<div data-id-work="' + indexworks + '" class="item_tender admin"><span class="adress">from: ' + JSON.stringify(real_parse[index].works[indexworks].from) + '</span><p class="text">' + JSON.stringify(real_parse[index].works[indexworks].text) + '</p><div class="decision"><a href="#"><button class="accept">Accept</button></a><a href="#"><button class="decline">Delete</button></a></div><div class="likes"><a href="#" class="like"><img src="img/like.png" alt=""></a><span class="count">' + JSON.stringify(real_parse[index].works[indexworks].like) + '</span></div></div>');
    })
  });

  $('.heart img').hover(function(){
    if ($(this).hasClass('favorite')) {
      $(this).attr('src','./img/heart_gray.png');      
    } else {
      $(this).attr('src','./img/heart.png');
    }              
  },function(){
    if ($(this).hasClass('favorite')) {
      $(this).attr('src','./img/heart.png');      
    } else {
      $(this).attr('src','./img/heart_gray.png');      
    }        
  })

  $('.heart img').click(function(){
    $(this).toggleClass('favorite');
  })


    $('.contest h3').click(function(){
    var name = $(this).text();      
    var id_tender = $(this).parent().parent().attr('data-id');
    var desc = $(this).parent().parent().find('.descr_short').text();      
    var category = $(this).parent().parent().find('.category').text();      
    var price = $(this).parent().parent().find('.cost').text();      
    var deadline = $(this).parent().parent().find('.deadline').text();            
    var favorite = false;
    var works = $(this).parent().parent().find('.wokrs').clone();
    var winner = $(this).parent().parent().find('.winner').clone();
    $(works).removeClass('wokrs');
    $(winner).removeClass('winner');
    if ($(this).parent().parent().find('.heart img').hasClass('favorite')) {
      favorite = true; 
    };

    // chooseWinner: function (idP,idW)
        var to = dappAddress;
        var value = 0;
        var id_works = 0;        
        var args = [];
        args.push(id_tender);
        args.push(id_works);
        var callArgs = JSON.stringify(args);   
        var callFunction2 = 'chooseWinner';
        nebPay.simulateCall(to, value, callFunction2, callArgs, { 
          listener: cbSubmit
        });

    $('.content').hide();
    $('.tender_wrap').show();      
    $('.tender_wrap .tender .descr_full').html(desc);
    $('.tender_wrap .tender h2').html(name);
    $('.tender_wrap .tender').attr('data-id', id_tender);
    $('.tender_wrap .tender .category').html(category);
    $('.tender_wrap .tender .cost').html(price);
    $('.tender_wrap .tender .deadline').html(deadline);
    $('.tender_wrap .resposnses').html('<h2>Tenderers</h2>');    
    $('.tender_wrap .result_winner').html('');    
    if ($(this).parent().parent().hasClass('complete')){      
      $('.tender_wrap .result_winner').append(winner);
      $('.tender_wrap .result_winner').html('<h2>Winner</h2>');
    } else {      
    }    
    $('.tender_wrap .resposnses').append(works); 

    acceptDecline();
    buttonDist();

    $('.like').click(function(){
      // like: function (idP,idW)
      var to = dappAddress;
      var value = 0;
      var id_works = $(this).parent().parent().attr('data-id-work');
      var id_tender = $('.tender_wrap .tender').attr('data-id');
      var args = [];
      args.push(id_tender);
      args.push(id_works);
      var callArgs = JSON.stringify(args);   
      var callFunction2 = 'like';
      nebPay.call(to, value, callFunction2, callArgs, { 
        listener: cbAdd
      });

    })
  })

  $('.contest .heart').click(function(){
    // push: function (id)
    var to = dappAddress;
    var value = 0;
    var callFunction = 'addFavorite';
    var id = $(this).parent().attr('data-id');  
    var args = [];
    args.push(id);
    var callArgs = JSON.stringify(args);    
    nebPay.call(to, value, callFunction, callArgs, { 
      listener: cbAdd              
    });  
  })
}

$('.my_tenders_tab').click(function(){
  var to = dappAddress;
  var value = 0;
  var callArgs = "[]";   
  var callFunction2 = 'readByOwner';
    nebPay.simulateCall(to, value, callFunction2, callArgs, { 
      listener: cbMyTenders              
    }); 
})

function cbFavoriteTab(resp) {   
    indexes = [];
    try {
      var real_parse = JSON.parse(resp.result);   
    } catch (err) {
      if (err == 'SyntaxError: Unexpected token E in JSON at position 0') {
        $('.contests .row').html('<p class="error">The are not any project in favorite</p>'); 
      }      
      return false;
    };   
    $.each(real_parse.reverse(),function(index,value){    
      indexes.push(real_parse[index].id);
    });
    var to = dappAddress;
    var value = 0;   
    var callFunction = 'read';
    var callArgs = "[]";    
    nebPay.simulateCall(to, value, callFunction, callArgs, { 
      listener: cbReadFav              
    });    
}


function cbReadFav(resp){
    try {
      var real_parse = JSON.parse(resp.result);   
    } catch (err) {   
      $('.contests .row').html('');   
      return false;
    }      
    $('.contests .row').html('');    
    $.each(real_parse.reverse(),function(index,value){
      var value_for_fav = real_parse[index].id;
      var bool_heart = false;
      $.each(indexes,function(index,value){
        if (indexes[index] == value_for_fav) {
          bool_heart = true;
        } else {          
        }
      });
      if (bool_heart) {        
        var date_output = new Date(real_parse[index].deadline);
        var date_output_year = date_output.getFullYear();
        var date_output_month = date_output.getMonth();
        var date_output_date = date_output.getDate();
        date_output = date_output_date + '-' + date_output_month + '-' + date_output_year;        
        var distribut = '';
    if (real_parse[index].status == 'complete(the prize is distributed among the participants)') { 
      distribut = 'distribut'; } else { distribut = real_parse[index].status }
        $('.contests .row').append('<div data-id="' + real_parse[index].id + '" class="contest ' + distribut + '"><a href="#"><h3>' + real_parse[index].name + '</h3></a><p class="descr_short">' + real_parse[index].description + '</p><span class="category">' + real_parse[index].category + '</span><span class="cost">' + (real_parse[index].prize/1000000000000000000) + '</span><span class="deadline" title="deadline">' + date_output + '</span><a href="#" class="heart"><img class="favorite" src="img/heart.png"></a><div class="wokrs"></div></div>')      
        $.each(real_parse[index].works, function(indexworks,value){        
          // $('.contests .row .contest:last-child').find('.wokrs').append('<div class="data_data"><span class="text-data">' + JSON.stringify(real_parse[index].works[indexworks].text) + '</span><span class="from_data"> ' + JSON.stringify(real_parse[index].works[indexworks].from) + ' </span><span class="like_data"> ' + JSON.stringify(real_parse[index].works[indexworks].like) + ' </span></div>"');        
          $('.contests .row .contest:last-child').find('.wokrs').append('<div data-id-work="' + indexworks + '" class="item_tender admin"><span class="adress">from: ' + JSON.stringify(real_parse[index].works[indexworks].from) + '</span><p class="text">' + JSON.stringify(real_parse[index].works[indexworks].text) + '</p><div class="decision"><a href="#"><button class="accept">Accept</button></a><a href="#"><button class="decline">Delete</button></a></div><div class="likes"><a href="#" class="like"><img src="img/like.png" alt=""></a><span class="count">' + JSON.stringify(real_parse[index].works[indexworks].like) + '</span></div></div>');
        })
      } else {                
      }
    });

      $('.contest h3').click(function(){
        var name = $(this).text();      
        var id_tender = $(this).parent().parent().attr('data-id');
        var desc = $(this).parent().parent().find('.descr_short').text();      
        var category = $(this).parent().parent().find('.category').text();      
        var price = $(this).parent().parent().find('.cost').text();      
        var deadline = $(this).parent().parent().find('.deadline').text();            
        var favorite = false;
        var works = $(this).parent().parent().find('.wokrs').clone();
        var winner = $(this).parent().parent().find('.winner').clone();
        $(works).removeClass('wokrs');
        $(winner).removeClass('winner');
        // chooseWinner: function (idP,idW)
        var to = dappAddress;
        var value = 0;
        var id_works = 0;        
        var args = [];
        args.push(id_tender);
        args.push(id_works);
        var callArgs = JSON.stringify(args);   
        var callFunction2 = 'chooseWinner';
        nebPay.simulateCall(to, value, callFunction2, callArgs, { 
          listener: cbSubmit
        });

        if ($(this).parent().parent().find('.heart img').hasClass('favorite')) {
          favorite = true;
        };
    $('.content').hide();
    $('.tender_wrap').show();      
    $('.tender_wrap .tender .descr_full').html(desc);
    $('.tender_wrap .tender h2').html(name);
    $('.tender_wrap .tender').attr('data-id', id_tender);
    $('.tender_wrap .tender .category').html(category);
    $('.tender_wrap .tender .cost').html(price);
    $('.tender_wrap .tender .deadline').html(deadline);
    $('.tender_wrap .resposnses').html('<h2>Tenderers</h2>');
    $('.tender_wrap .result_winner').html('');
    if ($(this).parent().parent().hasClass('complete')){
      $('.tender_wrap .result_winner').html('<h2>Winner</h2>');
      $('.tender_wrap .result_winner').append(winner);
    } else {      
    }    
    $('.tender_wrap .resposnses').append(works); 

    acceptDecline();
    buttonDist();

    $('.like').click(function(){
      // like: function (idP,idW)
      var to = dappAddress;
      var value = 0;
      var id_works = $(this).parent().parent().attr('data-id-work');
      var id_tender = $('.tender_wrap .tender').attr('data-id');
      var args = [];
      args.push(id_tender);
      args.push(id_works);
      var callArgs = JSON.stringify(args);   
      var callFunction2 = 'like';
      nebPay.call(to, value, callFunction2, callArgs, { 
        listener: cbAdd
      });

    })
  })

    $('.heart img').hover(function(){
      if ($(this).hasClass('favorite')) {
        $(this).attr('src','./img/heart_gray.png');      
      } else {
        $(this).attr('src','./img/heart.png');
      }              
    },function(){
      if ($(this).hasClass('favorite')) {
        $(this).attr('src','./img/heart.png');      
      } else {
        $(this).attr('src','./img/heart_gray.png');      
      }        
    })

    $('.heart img').click(function(){
      $(this).toggleClass('favorite');
    })

    $('.contest .heart').click(function(){
      // push: function (id)
      var to = dappAddress;
      var value = 0;
      var callFunction = 'addFavorite';
      var id = $(this).parent().attr('data-id');  
      var args = [];
      args.push(id);
      var callArgs = JSON.stringify(args);    
      nebPay.call(to, value, callFunction, callArgs, { 
        listener: cbAdd              
      });  
    })

    // $('.contest h3').click(function(){            
    //   var desc = $(this).parent().parent().find('.descr_short').text();      
    //   var category = $(this).parent().parent().find('.category').text();      
    //   var price = $(this).parent().parent().find('.cost').text();      
    //   var deadline = $(this).parent().parent().find('.deadline').text();            
    //   var favorite = false;
    //   if ($(this).parent().parent().find('.heart img').hasClass('favorite')) {
    //     favorite = true;
    //   };
    //   $('.content').hide();      
    //   $('.tender_wrap').show();        

    //    // chooseWinner: function (idP,idW)
    //     var to = dappAddress;
    //     var value = 0;
    //     var id_works = 0;        
    //     var args = [];
    //     args.push(id_tender);
    //     args.push(id_works);
    //     var callArgs = JSON.stringify(args);   
    //     var callFunction2 = 'chooseWinner';
    //     nebPay.simulateCall(to, value, callFunction2, callArgs, { 
    //       listener: cbSubmit
    //     });

    // })
}

$('.tabs ul button').click(function(){
  if($(this).hasClass('active')){
    return false;
  } else {
    $('.tabs button').removeClass('active');
    $(this).addClass('active');
  }
})

$('.filters #by_category').change(function(){
  // readByCategory: function (category);  
  var to = dappAddress;
  var value = 0;    
  var category = $(this).val();
  var args = [];
  args.push(category);
  var callArgs = JSON.stringify(args);
  var callFunction = 'readByCategory';
  nebPay.simulateCall(to, value, callFunction, callArgs, { 
    listener: cbRead              
  }); 
})

$('.filters #by_cost').change(function(){
  // readByCategory: function (category);  
  var to = dappAddress;
  var value = 0; 
  var sort = $(this).val();       
  var args = [];
  args.push(sort);
  var callArgs = JSON.stringify(args);  
  var callFunction = 'readByCost';
  nebPay.simulateCall(to, value, callFunction, callArgs, { 
    listener: cbRead              
  }); 
})


$('.filters #by_deadline').change(function(){
  // readByCategory: function (category);  
  var to = dappAddress;
  var value = 0; 
  var sort = $(this).val();       
  var args = [];
  args.push(sort);
  var callArgs = JSON.stringify(args);  
  var callFunction = 'readByDL';
  nebPay.simulateCall(to, value, callFunction, callArgs, { 
    listener: cbRead              
  }); 
})




// ------------------------------------------------- tender page

function cbSubmit(resp) {
  console.log('cbSubmit ' + JSON.stringify(resp));
  if (JSON.stringify(resp.result) == '"Error: you are not owner of this project"') {
    $('.item_tender ').removeClass('admin');
    $('.decision').hide();
  } else {
    $('.item_tender ').addClass('admin');
    $('.decision').show();
  }
  // Error: you are not owner of this project
  // chooseWinner = JSON.stringify(resp);
  // $(works)
}

$('.send_offer').click(function(){
  var to = dappAddress;
  var value = 0;
  var text_msg = $('.add_response #offer').val();
  var id_tender = $('.tender_wrap .tender').attr('data-id');  
  var args = [];
  args.push(text_msg);
  args.push(id_tender);
  var callArgs = JSON.stringify(args);   
  var callFunction2 = 'submit';
    nebPay.call(to, value, callFunction2, callArgs, {       
      listener: cbAdd
    });
})

$('.like').click(function(){
  // like: function (idP,idW)
  var to = dappAddress;
  var value = 0;
  var id_works = $(this).parent().parent().attr('data-id-work');
  var id_tender = $('.tender_wrap .tender').attr('data-id');
  var args = [];
  args.push(id_tender);
  args.push(id_works);
  var callArgs = JSON.stringify(args);   
  var callFunction2 = 'like';
  nebPay.call(to, value, callFunction2, callArgs, { 
    listener: cbAdd
  });
})

$('.back').click(function(){
  $('.content').show();
  $('.tender_wrap').hide();      
})

$('.content').show();
$('.tender_wrap').hide();      

function acceptDecline() {
  $('.accept').click(function(){
  // chooseWinner: function (idP,idW) {
  var to = dappAddress;
  var value = 0;
  var id_works = $(this).parent().parent().parent().attr('data-id-work');
  var id_tender = $('.tender_wrap .tender').attr('data-id');
  var args = [];
  args.push(id_tender);
  args.push(id_works);
  var callArgs = JSON.stringify(args);   
  var callFunction2 = 'chooseWinner';
  nebPay.call(to, value, callFunction2, callArgs, { 
    listener: cbAdd
  });
})

  $('.decline').click(function(){
    // deleteWork: function (idP,idW)
    var to = dappAddress;
    var value = 0;
    var id_works = $(this).parent().parent().parent().attr('data-id-work');
    var id_tender = $('.tender_wrap .tender').attr('data-id');
    var args = [];
    args.push(id_tender);
    args.push(id_works);
    var callArgs = JSON.stringify(args);   
    var callFunction2 = 'deleteWork';
    nebPay.call(to, value, callFunction2, callArgs, { 
      listener: cbAdd
    });
  })
  
}

$('.get_dist').click(function(){
  // distribute: function (idP,idW)
  var to = dappAddress;
    var value = 0;
    var id_works = 0;
    var id_tender = $('.tender_wrap .tender').attr('data-id');
    var args = [];
    args.push(id_tender);
    args.push(id_works);
    var callArgs = JSON.stringify(args);   
    var callFunction2 = 'distribute';
    nebPay.call(to, value, callFunction2, callArgs, { 
      listener: cbDist
    });
})

function buttonDist() {
  // distribute: function (idP,idW)
  var to = dappAddress;
    var value = 0;
    var id_works = 0;
    var id_tender = $('.tender_wrap .tender').attr('data-id');
    var args = [];
    args.push(id_tender);
    args.push(id_works);
    var callArgs = JSON.stringify(args);   
    var callFunction2 = 'distribute';
    nebPay.simulateCall(to, value, callFunction2, callArgs, { 
      listener: cbDist
    });
}


function cbDist(resp) {
  console.log('DISTDISTDIST' + JSON.stringify(resp));
  var count_elements = $('.resposnses .item_tender').length;  
  if (JSON.stringify(resp.result) == '"Error: now < deadline + 1 day"' || JSON.stringify(resp.result) == "project.status != 'pending') throw new Error(\"the project is already completed\"" || count_elements == 0) {      
  } else {
    $('.get_dist').attr('disabled', false);
    $('.get_dist').addClass('get_dist_active');
  }
}