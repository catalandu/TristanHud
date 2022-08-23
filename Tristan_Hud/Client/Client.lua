RegisterCommand('config', function()
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'configHud',
    })
end)

RegisterNUICallback("exit" , function(data, cb)
    SetNuiFocus(false, false)
    SendNUIMessage({
        action = 'closeHud'
    })
end)


local ESX = exports["es_extended"]:getSharedObject()
local pid, data, job, ranklabel, money, bank, vip
local show = true
AddEventHandler('playerSpawned', function()   
    Citizen.CreateThread(function ()
        while true do 
            if show and not IsPauseMenuActive() then 
                
                pid = GetPlayerServerId(PlayerId())
                data = ESX.GetPlayerData()
                job = data.job.label
                ranklabel = data.job.grade_label
                money, bank, vip = 0, 0, 0
                
                for i = 1, #data.accounts do 
                    if data.accounts[i].name == 'money' then 
                        money = data.accounts[i].money
                    elseif data.accounts[i].name == 'bank' then
                        bank = data.accounts[i].money
                    elseif data.accounts[i].name == 'vip_llaves' then
                        vip = data.accounts[i].money
                    end
                end

                ESX.TriggerServerCallback('esx_society:getSocietyMoney', function(societymoney)
                    societymoney = societymoney

                    SendNUIMessage({
                        action = 'showHud',
                        pid = pid,
                        money = money,
                        bank = bank,
                        vip = vip,
                        societymoney = societymoney,
                        job = job,
                        ranklabel = ranklabel
                    })

                end, data.job.name)
            else
                SendNUIMessage({
                    action = 'hideAllHud',
                })
            end
            Wait(500)
        end
    end)
end)


RegisterCommand('latamhud', function()
    if show then 
        show = false
      --  DisplayRadar(false) -- This hide the radar
    else 
        show = true
     --   DisplayRadar(true) -- this show the radar
    end
end)