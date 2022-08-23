

window.addEventListener("message", function(event) {
    var v = event.data 
    let clicked = false
        $('.iconcontainer').click(function(){
            clicked = !clicked
            if (clicked) {
                $('.iconcontainer').css({'transition':'none'})
            } else {
                $('.iconcontainer').css({'transition':'.5s'})
            }
        })
    switch (v.action) {
        // Open Panel
        case "configHud":
            $('.jobjs').draggable()
            $('.moneyjs').draggable()
            $('.bankjs').draggable()
            $('.idjs').draggable()
            $('.vipjs').draggable()
            $('.societyjs').draggable()
            $('.menuhud').show()
        break;

        case "hideAllHud": 
            $('.container').hide()
        break;

        case "closeHud":
            $('.menuhud').hide()
        break;

        case "showHud":
            $('.container').show()

            $('.pid').text(` ${v.pid}`)
            $('.bankjs span').text(` ${v.bank}`)
            $('.moneyjs span').text(` ${v.money}`)
            $('.vipjs span').text(` ${v.vip}`)
            $('.societyjs span').text(` ${v.societymoney}`)
            $('.jobjs span').text(` ${v.job} - ${v.ranklabel}`)
            if($('.jobcheck').is(':checked')) {
                $('.jobjs').css({'opacity':'1'})
            } else {
                $('.jobjs').css({'opacity':'0'})
            } 
            
            if($('.moneycheck').is(':checked')) {
                $('.moneyjs').css({'opacity':'1'})
            } else {
                $('.moneyjs').css({'opacity':'0'})
            }

            if($('.bankcheck').is(':checked')) {
                $('.bankjs').css({'opacity':'1'})
            } else {
                $('.bankjs').css({'opacity':'0'})
            }

            if($('.idcheck').is(':checked')) {
                $('.idjs').css({'opacity':'1'})
            } else {
                $('.idjs').css({'opacity':'0'})
            }

            if($('.vipcheck').is(':checked')) {
                $('.vipjs').css({'opacity':'1'})
            } else {
                $('.vipjs').css({'opacity':'0'})
            }

            if($('.societycheck').is(':checked')) {
                $('.societyjs').css({'opacity':'1'})
            } else {
                $('.societyjs').css({'opacity':'0'})
            }
        break;
    }

});




$(function(){
    $('.savehud').click(function(){
        $.post('https://Tristan_Hud/exit', JSON.stringify({}));
        save();
    })    

    $('.resethud').click(function(){
        resetDrag()
    })    

    $(".moneyjs").on("dragstop", function(event, ui) {
        dragBankTop = ui.position.top;
        dragBankLeft = ui.position.left;
        localStorage.setItem("moneyjsTop", dragBankTop);
        localStorage.setItem("moneyjsLeft", dragBankLeft);
    });

    $(".jobjs").on("dragstop", function(event, ui) {
        dragJobTop = ui.position.top;
        dragJobLeft = ui.position.left;
        localStorage.setItem("jobjsTop", dragJobTop);
        localStorage.setItem("jobjsLeft", dragJobLeft);
    });

    $(".bankjs").on("dragstop", function(event, ui) {
        dragBankTop = ui.position.top;
        dragBankLeft = ui.position.left;
        localStorage.setItem("bankjsTop", dragBankTop);
        localStorage.setItem("bankjsLeft", dragBankLeft);
    });

    $(".idjs").on("dragstop", function(event, ui) {
        dragIdTop = ui.position.top;
        dragIdLeft = ui.position.left;
        localStorage.setItem("idjsTop", dragIdTop);
        localStorage.setItem("idjsLeft", dragIdLeft);
    });

    $(".vipjs").on("dragstop", function(event, ui) {
        dragVipTop = ui.position.top;
        dragVipLeft = ui.position.left;
        localStorage.setItem("vipjsTop", dragVipTop);
        localStorage.setItem("vipjsLeft", dragVipLeft);
    }); 

    $(".societyjs").on("dragstop", function(event, ui) {
        dragSocietyTop = ui.position.top;
        dragSocietyLeft = ui.position.left;
        localStorage.setItem("societyjsTop", dragSocietyTop);
        localStorage.setItem("societyjsLeft", dragSocietyLeft);
    });
})

$(document).keyup((e) => {
    if (e.key === "Escape") {
        setTimeout(() => {
            $.post('https://Tristan_Hud/exit', JSON.stringify({}));
        }, 300);
    }
});

window.addEventListener('load', () => {
    setPosition();
    load();
});


const setPosition = ()=> {
    $(".moneyjs").animate({ top: localStorage.getItem("moneyjsTop"), left: localStorage.getItem("moneyjsLeft") });
    $(".jobjs").animate({ top: localStorage.getItem("jobjsTop"), left: localStorage.getItem("jobjsLeft") });
    $(".bankjs").animate({ top: localStorage.getItem("bankjsTop"), left: localStorage.getItem("bankjsLeft") });
    $(".idjs").animate({ top: localStorage.getItem("idjsTop"), left: localStorage.getItem("idjsLeft") });
    $(".vipjs").animate({ top: localStorage.getItem("vipjsTop"), left: localStorage.getItem("vipjsLeft") });
    $(".societyjs").animate({ top: localStorage.getItem("societyjsTop"), left: localStorage.getItem("societyjsLeft") });
}


function saveId(item, check) {
    localStorage.setItem(item, check);
}

const resetDrag = ()=> {
    $(".moneyjs").animate({ top: "0px", left: "0px" });
    saveId('moneyjsTop', '0px');
    saveId('moneyjsLeft', '0px');

    $(".jobjs").animate({ top: "0px", left: "0px" });
    saveId('jobjsTop', '0px');
    saveId('jobjsLeft', '0px');

    $(".bankjs").animate({ top: "0px", left: "0px" });
    saveId('bankjsTop', '0px');
    saveId('bankjsLeft', '0px');

    $(".idjs").animate({ top: "0px", left: "0px" });
    saveId('idjsTop', '0px');
    saveId('idjsLeft', '0px');

    $(".vipjs").animate({ top: "0px", left: "0px" });
    saveId('vipjsTop', '0px');
    saveId('vipjsLeft', '0px');

    $(".societyjs").animate({ top: "0px", left: "0px" });
    saveId('societyjsTop', '0px');
    saveId('societyjsLeft', '0px');

    $('.jobcheck').attr('checked', true)
    $('.moneycheck').attr('checked', true)
    $('.bankcheck').attr('checked', true)
    $('.societycheck').attr('checked', true)
    $('.idcheck').attr('checked', true)
    $('.vipcheck').attr('checked', true)
    save();
}


function save(){
    var jobbox = $('.jobcheck')[0];
    var moneybox = $('.moneycheck')[0];
    var bankbox = $('.bankcheck')[0];
    var societybox = $('.societycheck')[0]; 
    var idbox = $('.idcheck')[0]; 
    var vipbox = $('.vipcheck')[0]; 
    localStorage.setItem('JobBox', jobbox.checked);
    localStorage.setItem('MoneyBox', moneybox.checked);
    localStorage.setItem('BankBox', bankbox.checked);
    localStorage.setItem('SocietyBox', societybox.checked);
    localStorage.setItem('IdBox', idbox.checked);
    localStorage.setItem('VipBox', vipbox.checked);
}

function load(){    
    var jobload = JSON.parse(localStorage.getItem('JobBox'));
    var moneyload = JSON.parse(localStorage.getItem('MoneyBox'));
    var bankload = JSON.parse(localStorage.getItem('BankBox'));
    var societyload = JSON.parse(localStorage.getItem('SocietyBox'));
    var idload = JSON.parse(localStorage.getItem('IdBox'));
    var vipload = JSON.parse(localStorage.getItem('VipBox'));
    $('.jobcheck').attr('checked', jobload)
    $('.moneycheck').attr('checked', moneyload)
    $('.bankcheck').attr('checked', bankload)
    $('.societycheck').attr('checked', societyload)
    $('.idcheck').attr('checked', idload)
    $('.vipcheck').attr('checked', vipload)
}