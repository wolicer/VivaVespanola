
        var raidList = [];
        var charList = [];
        var itemList = [];
        var shopList = [];
        var projList = [];
        var membList = [];
        var alrmList = [];
        var memoList = '';
        var currentlyEditingRaidListId;
        var currentlyEditingCharListId;
        var currentlyEditingItemListId;
        var currentlyEditingShopListId;
        var currentlyEditingProjListId;
        var currentlyEditingMembListId;
        var currentlyEditingAlrmListId;
        var isLocalStorageAvailable;
        var progressBarValueRaid = 0;
        var progressBarTotalRaid = 0;
        var progressBarValueChar = 0;
        var progressBarTotalChar = 0;
        var progressBarValueMemb = 0;
        var progressBarTotalMemb = 0;
        var globalOption;
        var alarmInProgress;
        var messageInProgress;
        var scriptVersion = "1.7";
        var alarmAudio = document.getElementById('ged-content-reminder-body-alarm');
        //var gedColorLinks = [white,gray,blue,green,red]
        var gedColorLinks = ['https://rawgit.com/wolicer/VivaVespanola/master/styles/index-white.css',
                                'https://rawgit.com/wolicer/VivaVespanola/master/styles/index-gray.css',
                                'https://rawgit.com/wolicer/VivaVespanola/master/styles/index-blue.css',
                                'https://rawgit.com/wolicer/VivaVespanola/master/styles/index-green.css',
                                'https://raw.githubusercontent.com/wolicer/VivaVespanola/master/styles/index-red.css'];

        $(document).ready(function () {
            // Check Compatibility
            isLocalStorageAvailable = checkLocalStorageCompatibility();

            // Load Local Storage
            retrieveOptionData();
            retrieveRaidTableData();
            retrieveCharTableData();
            retrieveItemTableData();
            retrieveShopTableData();
            retrieveProjTableData();
            retrieveMembTableData();
            retrieveAlrmTableData();
            retrieveMemoTableData();

            // Initialize
            initializeTitleMenuButton();
            initializeCreatorContent();
            initializeRaiderContent();
            initializeCollectorContent();
            initializeTraderContent();
            initializeSurveyorContent();
            initializeReminderContent();
            initializeMemoirContent();
            initializeAllContent();

            // Reload Tables
            reloadRaidTable();
            reloadCharTable();
            reloadItemTable();
            reloadShopTable();
            reloadProjTable();
            reloadMembTable();
            reloadAlrmTable();
            reloadMemoTable();
        });

        // Initialization Function
        function initializeCreatorContent() {
            $('#ged-script-version').text(scriptVersion);
            if (typeof globalOption === 'undefined') {
                globalOption = new GlobalOption('white', 'smoothness', false, true, true, true, true, 5);
                $('.ged-content-developer-control').css('display', 'none');
                $('#ged-content-creator-confirm-leave').prop('checked', true);
                $('#ged-content-creator-reseed-empty').prop('checked', true);
                $('#ged-content-creator-auto-reload').prop('checked', true);
                $('#ged-content-creator-mission-vision option[value=5]').prop('selected', true);
                $('.ged-color-link').attr('href', gedColorLinks[0]);
                $(window).bind('beforeunload', function () {
                    return 'Are you sure you want to leave?';
                });
                $('div.ged-body').css('min-width', 'auto');
                $('div.ged-body').css('width', 'auto');
                if (raidList.length == 0 && charList.length == 0 && itemList.length == 0 && projList.length == 0) {
                    seedRaidList();
                    seedCharList();
                    seedAlrmList();
                }
                storeOptionData();
            }
            else {
                $('#ged-content-creator-color-switcher option[value=' + globalOption.Color + ']').prop('selected', true);
                if (globalOption.Color == 'gray') {
                    $('.ged-color-link').attr('href', gedColorLinks[1]);
                }
                else if (globalOption.Color == 'blue') {
                    $('.ged-color-link').attr('href', gedColorLinks[2]);
                }
                else if (globalOption.Color == 'green') {
                    $('.ged-color-link').attr('href', gedColorLinks[3]);
                }
                else if (globalOption.Color == 'red') {
                    $('.ged-color-link').attr('href', gedColorLinks[4]);
                }
                else {
                    $('.ged-color-link').attr('href', gedColorLinks[0]);
                }

                $('#ged-content-creator-theme-switcher option[value=' + globalOption.Theme + ']').prop('selected', true);
                $('.ged-theme-link').attr('href', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/themes/' + globalOption.Theme + '/jquery-ui.css');

                $('#ged-content-creator-mission-vision option[value=' + globalOption.MissionVision + ']').prop('selected', true);
                
                $('#ged-content-creator-develop-view').prop('checked', globalOption.IsDeveloperView);
                if (globalOption.IsDeveloperView) {
                    $('.ged-content-developer-control').css('display', '');
                }
                else {
                    $('.ged-content-developer-control').css('display', 'none');
                }

                $('#ged-content-creator-confirm-leave').prop('checked', globalOption.IsConfirmLeave);
                if (globalOption.IsConfirmLeave) {
                    $(window).bind('beforeunload', function () {
                        return 'Are you sure you want to leave?';
                    });
                }
                else {
                    $(window).unbind('beforeunload');
                }

                $('#ged-content-creator-reseed-empty').prop('checked', globalOption.IsReseedEmpty);
                if (globalOption.IsReseedEmpty) {
                    if (raidList.length == 0 && charList.length == 0 && itemList.length == 0 && projList.length == 0 && alrmList.length == 0) {
                        seedRaidList();
                        seedCharList();
                        seedAlrmList();
                    }
                }

                $('#ged-content-creator-auto-reload').prop('checked', globalOption.IsAutoReloadTable);
            }

            $('#ged-content-creator-color-switcher').change(function () {
                var color = $(this).val();

                if (color == 'gray') {
                    $('.ged-color-link').attr('href', 'https://googledrive.com/host/0B6Dq7kBwBQwBVDJUaEFSd2FFSzg');
                }
                else if (color == 'blue') {
                    $('.ged-color-link').attr('href', 'https://googledrive.com/host/0B6Dq7kBwBQwBbmpHR3otTWFxUnc');
                }
                else if (color == 'green') {
                    $('.ged-color-link').attr('href', 'https://googledrive.com/host/0B6Dq7kBwBQwBbGktM0ZFQ0hDRDg');
                }
                else if (color == 'red') {
                    $('.ged-color-link').attr('href', 'https://googledrive.com/host/0B6Dq7kBwBQwBTHVqQ1J6YkFNSVU');
                }
                else {
                    $('.ged-color-link').attr('href', 'https://googledrive.com/host/0B6Dq7kBwBQwBYl9YTnpwQXlZREE');
                }
                
                globalOption.Color = color;
                storeOptionData();

                displayMessage('info', 'Color switched to ' + color + '.');
            });

            $('#ged-content-creator-theme-switcher').change(function () {
                var theme = $(this).val();
                var name = $('#ged-content-creator-theme-switcher option:selected').text();

                $('.ged-theme-link').attr('href', '//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/' + theme + '/jquery-ui.css');

                globalOption.Theme = theme;
                storeOptionData();

                displayMessage('info', 'Theme switched to ' + name + '.');
            });

            $('#ged-content-creator-mission-vision').change(function () {
                var missionVision = $(this).val();
                var name = $('#ged-content-creator-mission-vision option:selected').text();
                
                globalOption.MissionVision = missionVision;
                storeOptionData();

                reloadRaidTable();

                displayMessage('info', 'Mission Visibility switched to ' + name + '.');
            });

            $('#ged-content-creator-develop-view').change(function () {
                var isDeveloperView = $(this).prop('checked');
                if (isDeveloperView) {
                    $('.ged-content-developer-control').css('display', '');
                }
                else {
                    $('.ged-content-developer-control').css('display', 'none');
                }

                globalOption.IsDeveloperView = isDeveloperView;
                storeOptionData();
            });
            
            $('#ged-content-creator-confirm-leave').change(function () {
                var isConfirmLeave = $(this).prop('checked');
                if (isConfirmLeave) {
                    $(window).bind('beforeunload', function () {
                        return 'Are you sure you want to leave?';
                    });
                }
                else {
                    $(window).unbind('beforeunload');
                }

                globalOption.IsConfirmLeave = isConfirmLeave;
                storeOptionData();
            });

            $('#ged-content-creator-reseed-empty').change(function () {
                var isReseedEmpty = $(this).prop('checked');
                if (isReseedEmpty) {
                    if (raidList.length == 0 && charList.length == 0 && itemList.length == 0 && projList.length == 0) {
                        seedRaidList();
                        seedCharList();
                    }
                }

                globalOption.IsReseedEmpty = isReseedEmpty;
                storeOptionData();
            });

            $('#ged-content-creator-auto-reload').change(function () {
                var sure = true;
                var isAutoReloadTable = $(this).prop('checked');

                if (!isAutoReloadTable) {
                    sure = confirm('This option may affect record accuracy. Only disable this if you know what you are doing. Are you sure?');
                }

                if (sure) {

                    globalOption.IsAutoReloadTable = isAutoReloadTable;
                    storeOptionData();
                }
                else {
                    $(this).prop('checked', true);
                }
            });

            $('#ged-content-creator-reset-setting').click(function () {
                if (confirm('This will reset all settings and reload the page. Are you sure you?')) {
                    globalOption = new GlobalOption('white', 'smoothness', false, true, true, true, true, 5);
                    storeOptionData();
                    window.location.reload();
                }
            });
            
            $('#ged-content-creator-reseed-all').click(function () {
                if (confirm('This action is irreversible. Are you sure you want to reseed all data?')) {
                    seedRaidList();
                    seedCharList();
                    seedItemList();
                    seedProjList();
                    seedAlrmList();
                    reloadRaidTable();
                    reloadCharTable();
                    reloadItemTable();
                    reloadProjTable();
                    reloadAlrmTable();
                    displayMessage('alert', 'Sample records added.', 8000);
                }
            });

            $('#ged-content-creator-purge-all').click(function () {
                if (confirm('This action is irreversible. Are you sure you want to purge all data?')) {
                    raidList = [];
                    charList = [];
                    itemList = [];
                    projList = [];
                    alrmList = [];
                    memoList = '';
                    storeRaidTableData();
                    storeCharTableData();
                    storeItemTableData();
                    storeProjTableData();
                    storeAlrmTableData();
                    storeMemoTableData();
                    reloadRaidTable();
                    reloadCharTable();
                    reloadItemTable();
                    reloadProjTable();
                    reloadAlrmTable();
                    reloadMemoTable();
                    displayMessage('alert', 'All records purged.', 8000);
                }
            });

            $('#ged-content-creator-import-raid').click(function () {                
                if (confirm('This action will irreversibly replace the raid table data. Are you sure you want to import?')) {
                    importRaidTableData();
                    displayMessage('info', 'Raid table imported.');
                }
            });

            $('#ged-content-creator-export-raid').click(function () {
                exportRaidTableData();
            });

            $('#ged-content-creator-import-char').click(function () {
                if (confirm('This action will irreversibly replace the character table data. Are you sure you want to import?')) {
                    importCharTableData();
                    displayMessage('info', 'Character table imported.');
                }
            });

            $('#ged-content-creator-export-char').click(function () {
                exportCharTableData();
            });

            $('#ged-content-creator-import-item').click(function () {
                if (confirm('This action will irreversibly replace the item table data. Are you sure you want to import?')) {
                    importItemTableData();
                    displayMessage('info', 'Item table imported.');
                }
            });

            $('#ged-content-creator-export-item').click(function () {
                exportItemTableData();
            });

            $('#ged-content-creator-import-proj').click(function () {
                if (confirm('This action will irreversibly replace the project table data. Are you sure you want to import?')) {
                    importProjTableData();
                    displayMessage('info', 'Project table imported.');
                }
            });

            $('#ged-content-creator-export-proj').click(function () {
                exportProjTableData();
            });

            $('#ged-content-creator-import-memb').click(function () {
                if (confirm('This action will irreversibly replace the family table data. Are you sure you want to import?')) {
                    importMembTableData();
                    displayMessage('info', 'Family table imported.');
                }
            });

            $('#ged-content-creator-export-memb').click(function () {
                exportMembTableData();
            });

            $('#ged-content-creator-import-alrm').click(function () {
                if (confirm('This action will irreversibly replace the alarm table data. Are you sure you want to import?')) {
                    importAlrmTableData();
                    displayMessage('info', 'Alarm table imported.');
                }
            });

            $('#ged-content-creator-export-alrm').click(function () {
                exportAlrmTableData();
            });
        }

        function initializeTitleMenuButton()
        {
            $('#ged-title-menu-item-link-raider').click(function () {
                showContentRaider();
            });

            $('#ged-title-menu-item-link-collector').click(function () {
                showContentCollector();
            });

            $('#ged-title-menu-item-link-trader').click(function () {
                showContentTrader();
            });

            $('#ged-title-menu-item-link-surveyor').click(function () {
                showContentSurveyor();
            });

            $('#ged-title-menu-item-link-reminder').click(function () {
                showContentReminder();
            });

            $('#ged-title-menu-item-link-memoir').click(function () {
                showContentMemoir();
            });

            $('#ged-signature').click(function () {
                showContentCreator();
            });

            function showContentGeneral() {
                hideAllContent();
                $('.ged-content-general').show();
            }

            function showContentCreator() {
                hideAllContent();
                $('.ged-content-creator').show();
            }

            function showContentRaider() {
                hideAllContent();
                $('#ged-title-menu-item-link-raider').addClass('ged-title-menu-item-link-selected');
                $('.ged-content-raider').show();
            }

            function showContentCollector() {
                hideAllContent();
                $('#ged-title-menu-item-link-collector').addClass('ged-title-menu-item-link-selected');
                $('.ged-content-collector').show();
            }

            function showContentTrader() {
                hideAllContent();
                $('#ged-title-menu-item-link-trader').addClass('ged-title-menu-item-link-selected');
                $('.ged-content-trader').show();
            }

            function showContentSurveyor() {
                hideAllContent();
                $('#ged-title-menu-item-link-surveyor').addClass('ged-title-menu-item-link-selected');
                $('.ged-content-surveyor').show();
            }

            function showContentReminder() {
                hideAllContent();
                $('#ged-title-menu-item-link-reminder').addClass('ged-title-menu-item-link-selected');
                $('.ged-content-reminder').show();
            }

            function showContentMemoir() {
                hideAllContent();
                $('#ged-title-menu-item-link-memoir').addClass('ged-title-menu-item-link-selected');
                $('.ged-content-memoir').show();
            }

            function hideAllContent() {
                $('#ged-title-menu-item-link-raider').removeClass('ged-title-menu-item-link-selected');
                $('#ged-title-menu-item-link-collector').removeClass('ged-title-menu-item-link-selected');
                $('#ged-title-menu-item-link-trader').removeClass('ged-title-menu-item-link-selected');
                $('#ged-title-menu-item-link-surveyor').removeClass('ged-title-menu-item-link-selected');
                $('#ged-title-menu-item-link-reminder').removeClass('ged-title-menu-item-link-selected');
                $('#ged-title-menu-item-link-memoir').removeClass('ged-title-menu-item-link-selected');
                $('.ged-content-raider').hide();
                $('.ged-content-collector').hide();
                $('.ged-content-trader').hide();
                $('.ged-content-surveyor').hide();
                $('.ged-content-reminder').hide();
                $('.ged-content-memoir').hide();
                $('.ged-content-creator').hide();
                $('.ged-content-general').hide();
            }

            var titleChoice = window.location.hash;
            if (titleChoice == '#1') {
                showContentRaider();
            }
            else if (titleChoice == '#2') {
                showContentCollector();
            }
            else if (titleChoice == '#3') {
                showContentTrader();
            }
            else if (titleChoice == '#4') {
                showContentSurveyor();
            }
            else if (titleChoice == '#5') {
                showContentReminder();
            }
            else if (titleChoice == '#6') {
                showContentMemoir();
            }
            else if (titleChoice == '#0') {
                showContentCreator();
            }
            else {
                showContentGeneral();
            }
        }

        function initializeRaiderContent() {
            $('#ged-iconbutton-refreshRaid').button({ icons: { primary: 'ui-icon-refresh' } });
            $('#ged-iconbutton-addRaid').button({ icons: { primary: 'ui-icon-circle-plus' } });
            $('#ged-iconbutton-resetRaid').button({ icons: { primary: 'ui-icon-alert' } });
            
            $('.ged-content-raider-body-progressbar').progressbar({
                value: 0
            });
            
            $('#ged-iconbutton-refreshRaid').click(function () {
                reloadRaidTable();
                displayMessage('info', 'Raid Table updated.');
            });

            $('.ged-content-raider-body-dialog-resetConfirmation').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 600,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Reset',
                        click: function () {
                            seedRaidList();
                            reloadRaidTable();
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });

            $('#ged-iconbutton-resetRaid').click(function () {
                $('.ged-content-raider-body-dialog-resetConfirmation').dialog('open');
            });

            $('.ged-content-raider-body-dialog-info').dialog({
                autoOpen: false,
                resizable: false,
                width: 500,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Close',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });

            $('table#ged-content-raider-body-table').on('click', '.ged-button-missionDone', function () {
                var raidListId = parseInt($(this).attr('raidlistid'));
                missionDoneOrFail(raidListId, 'Done');
            });

            $('table#ged-content-raider-body-table').on('click', '.ged-button-missionFail', function () {
                var raidListId = parseInt($(this).attr('raidlistid'));
                missionDoneOrFail(raidListId, 'Fail');
            });

            $('table#ged-content-raider-body-table').on('click', '.ged-iconbutton-decrementRaid', function () {
                var raidListId = parseInt($(this).attr('raidlistid'));
                missionDecrement(raidListId);
            });

            $('table#ged-content-raider-body-table').on('click', '.ged-iconbutton-infoRaid', function () {
                currentlyEditingRaidListId = parseInt($(this).attr('raidlistid'));
                var raid = raidList[currentlyEditingRaidListId];
                $('.ged-content-raider-body-dialog-infoContent').html(raid.Note);
                $('.ged-content-raider-body-dialog-info').dialog({
                    title: raid.Name
                });
                $('.ged-content-raider-body-dialog-info').dialog('open');
            });
            
            $('table#ged-content-raider-body-table').on('click', '.ged-iconbutton-editRaid', function () {
                currentlyEditingRaidListId = parseInt($(this).attr('raidlistid'));
                var raid = raidList[currentlyEditingRaidListId];

                $('#dialog-addEditRaid-name').val(raid.Name);
                $('#dialog-addEditRaid-repeatCount').val(raid.MaxCount.toString());
                $('#dialog-addEditRaid-repeatTarget').val(raid.MaxTarget.toString());
                $('#dialog-addEditRaid-daily').prop('checked', raid.IsDaily);
                $('#dialog-addEditRaid-daily').button({ icons: { primary: raid.IsDaily ? 'ui-icon-circle-check' : 'ui-icon-circle-close' } });
                $('#dialog-addEditRaid-daily').button('refresh');
                $('#dialog-addEditRaid-week-sun').prop('checked', raid.DayList.indexOf('0') != -1)
                $('#dialog-addEditRaid-week-mon').prop('checked', raid.DayList.indexOf('1') != -1)
                $('#dialog-addEditRaid-week-tue').prop('checked', raid.DayList.indexOf('2') != -1)
                $('#dialog-addEditRaid-week-wed').prop('checked', raid.DayList.indexOf('3') != -1)
                $('#dialog-addEditRaid-week-thu').prop('checked', raid.DayList.indexOf('4') != -1)
                $('#dialog-addEditRaid-week-fri').prop('checked', raid.DayList.indexOf('5') != -1)
                $('#dialog-addEditRaid-week-sat').prop('checked', raid.DayList.indexOf('6') != -1)
                $('.dialog-addEditRaid-week').button('refresh');
                $('.dialog-addEditRaid-week').button({ disabled: raid.IsDaily });
                $('#dialog-addEditRaid-time').prop('checked', raid.IsTimeslot);
                $('#dialog-addEditRaid-time').button({ icons: { primary: raid.IsTimeslot ? 'ui-icon-circle-check' : 'ui-icon-circle-close' } });
                $('#dialog-addEditRaid-time').button('refresh');
                $('#dialog-addEditRaid-timeStart').val(raid.TimeStart)
                $('#dialog-addEditRaid-timeEnd').val(raid.TimeEnd)
                $('#dialog-addEditRaid-timeStart').prop('disabled', !raid.IsTimeslot);
                $('#dialog-addEditRaid-timeEnd').prop('disabled', !raid.IsTimeslot);
                $('#dialog-addEditRaid-cooldown').prop('checked', raid.IsCooldown);
                $('#dialog-addEditRaid-cooldown').button({ icons: { primary: raid.IsCooldown ? 'ui-icon-circle-check' : 'ui-icon-circle-close' } });
                $('#dialog-addEditRaid-cooldown').button('refresh');
                $('#dialog-addEditRaid-cooldownDuration').val(raid.CooldownCount.toString());
                $('#dialog-addEditRaid-cooldownDuration').prop('disabled', !raid.IsCooldown);
                $('#dialog-addEditRaid-duration').prop('checked', raid.GotDuration);
                $('#dialog-addEditRaid-duration').button({ icons: { primary: raid.GotDuration ? 'ui-icon-circle-check' : 'ui-icon-circle-close' } });
                $('#dialog-addEditRaid-duration').button('refresh');
                $('#dialog-addEditRaid-durationStart').val(raid.DurationStart);
                $('#dialog-addEditRaid-durationEnd').val(raid.DurationEnd);
                $('#dialog-addEditRaid-durationStart').prop('disabled', !raid.GotDuration);
                $('#dialog-addEditRaid-durationEnd').prop('disabled', !raid.GotDuration);
                $('#dialog-addEditRaid-note').val(raid.Note);

                setupRaidDialogForEdit();
                $('#ged-content-raider-body-dialog-addEditRaid').dialog('open');
            });

            initializeAddEditRaidDialog();
        }

        function initializeCollectorContent() {
            $('#ged-iconbutton-refreshChar').button({ icons: { primary: 'ui-icon-refresh' } });
            $('#ged-iconbutton-addCharacter').button({ icons: { primary: 'ui-icon-circle-plus' } });
            $('#ged-iconbutton-resetCollector').button({ icons: { primary: 'ui-icon-alert' } });

            $('.ged-content-collector-body-progressbar').progressbar({
                value: 0
            });

            $('#ged-iconbutton-refreshChar').click(function () {
                reloadCharTable();
                displayMessage('info', 'Character Table updated.');
            });

            $('.ged-content-collector-body-dialog-resetConfirmation').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 600,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Reset',
                        click: function () {
                            seedCharList();
                            reloadCharTable();
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });

            $('#ged-iconbutton-resetCollector').click(function () {
                $('.ged-content-collector-body-dialog-resetConfirmation').dialog('open');
            });

            $('.ged-content-collector-body-dialog-info').dialog({
                autoOpen: false,
                resizable: false,
                width: 500,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Close',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });
            
            $('table#ged-content-collector-body-table').on('click', '.ged-checkbox-recruit', function () {
                var charListId = parseInt($(this).attr('charlistid'));
                updateCharTableRow(charListId);
            });
            
            $('table#ged-content-collector-body-table').on('click', '.ged-iconbutton-infoChar', function () {
                currentlyEditingCharListId = parseInt($(this).attr('charlistid'));
                var char = charList[currentlyEditingCharListId];
                $('.ged-content-collector-body-dialog-infoContent').html(char.Note);
                $('.ged-content-collector-body-dialog-info').dialog({
                    title: char.Name
                });
                $('.ged-content-collector-body-dialog-info').dialog('open');
            });
            
            $('table#ged-content-collector-body-table').on('click', '.ged-iconbutton-editChar', function () {
                currentlyEditingCharListId = parseInt($(this).attr('charlistid'));
                var char = charList[currentlyEditingCharListId];

                $('#dialog-addEditChar-name').val(char.Name);
                $('#dialog-addEditChar-rank-pio').prop('checked', char.Rank == 'Pioneer')
                $('#dialog-addEditChar-rank-que').prop('checked', char.Rank == 'Quest')
                $('#dialog-addEditChar-rank-pre').prop('checked', char.Rank == 'Premium')
                $('#dialog-addEditChar-rank-pro').prop('checked', char.Rank == 'Promotional')
                $('.dialog-addEditChar-rank').button('refresh');
                $('#dialog-addEditChar-icon').val(char.Icon);
                $('#dialog-addEditChar-note').val(char.Note);

                setupCharDialogForEdit();
                $('#ged-content-collector-body-dialog-addEditChar').dialog('open');
            });

            initializeAddEditCharDialog();
        }

        function initializeTraderContent() {
            $('#ged-iconbutton-refreshItem').button({ icons: { primary: 'ui-icon-refresh' } });
            $('#ged-iconbutton-addItem').button({ icons: { primary: 'ui-icon-circle-plus' } });
            $('#ged-iconbutton-resetTraderItem').button({ icons: { primary: 'ui-icon-alert' } });

            $('#ged-iconbutton-refreshShop').button({ icons: { primary: 'ui-icon-refresh' } });
            $('#ged-iconbutton-addShop').button({ icons: { primary: 'ui-icon-circle-plus' } });
            $('#ged-iconbutton-resetTraderShop').button({ icons: { primary: 'ui-icon-alert' } });

            $('#ged-iconbutton-refreshProj').button({ icons: { primary: 'ui-icon-refresh' } });
            $('#ged-iconbutton-addProj').button({ icons: { primary: 'ui-icon-circle-plus' } });
            $('#ged-iconbutton-resetTraderProj').button({ icons: { primary: 'ui-icon-alert' } });

            $('#ged-iconbutton-refreshItem').click(function () {
                reloadItemTable();
                displayMessage('info', 'Price Track updated.');
            });

            $('#ged-iconbutton-refreshShop').click(function () {
                reloadShopTable();
                displayMessage('info', 'Shop List updated.');
            });

            $('#ged-iconbutton-refreshProj').click(function () {
                reloadProjTable();
                displayMessage('info', 'Item Project updated.');
            });

            $('.ged-content-trader-body-dialog-resetConfirmationItem').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 600,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Reset',
                        click: function () {
                            seedItemList();
                            reloadItemTable();
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });

            $('#ged-iconbutton-resetTraderItem').click(function () {
                $('.ged-content-trader-body-dialog-resetConfirmationItem').dialog('open');
            });

            $('.ged-content-trader-body-dialog-resetConfirmationShop').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 600,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Reset',
                        click: function () {
                            seedShopList();
                            reloadShopTable();
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });

            $('#ged-iconbutton-resetTraderShop').click(function () {
                $('.ged-content-trader-body-dialog-resetConfirmationShop').dialog('open');
            });

            $('.ged-content-trader-body-dialog-resetConfirmationProj').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 600,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Reset',
                        click: function () {
                            seedProjList();
                            reloadProjTable();
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });

            $('#ged-iconbutton-resetTraderProj').click(function () {
                $('.ged-content-trader-body-dialog-resetConfirmationProj').dialog('open');
            });

            $('.ged-content-trader-body-dialog-info').dialog({
                autoOpen: false,
                resizable: false,
                width: 500,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Close',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });

            
            $('table#ged-content-trader-body-table-item').on('click', '.ged-iconbutton-infoItem', function () {
                currentlyEditingItemListId = parseInt($(this).attr('itemlistid'));
                var item = itemList[currentlyEditingItemListId];
                $('.ged-content-trader-body-dialog-infoContent').html(item.Note);
                $('.ged-content-trader-body-dialog-info').dialog({
                    title: item.Name
                });
                $('.ged-content-trader-body-dialog-info').dialog('open');
            });

            $('table#ged-content-trader-body-table-item').on('click', '.ged-iconbutton-editItem', function () {
                currentlyEditingItemListId = parseInt($(this).attr('itemlistid'));
                var item = itemList[currentlyEditingItemListId];

                $('#dialog-addEditItem-name').val(item.Name);
                $('#dialog-addEditItem-price').val(item.Price);
                var color = getItemColor(item.Price);
                $('#dialog-addEditItem-price-display').text(commaSeparateNumber(item.Price));
                $('#dialog-addEditItem-price-display').css('color', color);
                $('#dialog-addEditItem-price-display-currency').text(item.Currency == 'Vis' ? ' Vis' : ' Feso');
                $('#dialog-addEditItem-price-display-currency').css('color', item.Currency == 'Vis' ? 'gold' : 'lime');

                $('#dialog-addEditItem-currency-vis').prop('checked', item.Currency == 'Vis')
                $('#dialog-addEditItem-currency-fes').prop('checked', item.Currency == 'Feso')
                $('.dialog-addEditItem-currency').button('refresh');

                $('#dialog-addEditItem-type-equ').prop('checked', item.Type == 'Equip')
                $('#dialog-addEditItem-type-exp').prop('checked', item.Type == 'Expend')
                $('#dialog-addEditItem-type-mis').prop('checked', item.Type == 'Misc')
                $('#dialog-addEditItem-type-cos').prop('checked', item.Type == 'Costume')
                $('.dialog-addEditItem-type').button('refresh');

                $('#dialog-addEditItem-note').val(item.Note);

                setupItemDialogForEdit();
                $('#ged-content-trader-body-dialog-addEditItem').dialog('open');
            });

            $('table#ged-content-trader-body-table-shop').on('click', '.ged-iconbutton-infoShop', function () {
                currentlyEditingShopListId = parseInt($(this).attr('shoplistid'));
                var shop = shopList[currentlyEditingShopListId];
                $('.ged-content-trader-body-dialog-infoContent').html(shop.Note);
                $('.ged-content-trader-body-dialog-info').dialog({
                    title: shop.Name
                });
                $('.ged-content-trader-body-dialog-info').dialog('open');
            });

            $('table#ged-content-trader-body-table-shop').on('click', '.ged-iconbutton-editShop', function () {
                currentlyEditingShopListId = parseInt($(this).attr('shoplistid'));
                var shop = shopList[currentlyEditingShopListId];

                $("#dialog-addEditShop-name").val(shop.Name);
                $("#dialog-addEditShop-name").selectmenu('refresh');
                $('#dialog-addEditShop-quantity').val(shop.Quantity);
                $('#dialog-addEditShop-note').val(shop.Note);

                setupShopDialogForEdit();
                $('#ged-content-trader-body-dialog-addEditShop').dialog('open');
            });

            $('table#ged-content-trader-body-table-shop').on('click', '.ged-iconbutton-topShop', function () {
                currentlyEditingShopListId = parseInt($(this).attr('shoplistid'));
                var shop = shopList[currentlyEditingShopListId];

                for (var ctr = 0; ctr < shopList.length; ctr++) {
                    if (shopList[ctr].Order < shop.Order) {
                        shopList[ctr].Order += 1;
                    }
                }

                shopList[currentlyEditingShopListId].Order = 0;

                storeShopTableData();

                $(this).removeClass('ui-state-hover');
                var row = $(this).parents('tr:first');
                row.stop(true, true);
                row.effect("highlight", {}, 1800);
                row.insertBefore($('tbody#ged-content-trader-body-table-row-shop tr:first'));

                $('tr.ged-content-trader-body-table-row-shop .ged-iconbutton-topShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-upShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-downShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-bottomShop').removeClass('ui-state-disabled');
                $('tr.ged-content-trader-body-table-row-shop .ged-iconbutton-topShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-upShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-downShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-bottomShop').prop('disabled', false);
                $('tr.ged-content-trader-body-table-row-shop:first .ged-iconbutton-topShop, tr.ged-content-trader-body-table-row-shop:first .ged-iconbutton-upShop').addClass('ui-state-disabled');
                $('tr.ged-content-trader-body-table-row-shop:first .ged-iconbutton-topShop, tr.ged-content-trader-body-table-row-shop:first .ged-iconbutton-upShop').prop('disabled', true);
                $('tr.ged-content-trader-body-table-row-shop:last .ged-iconbutton-downShop, tr.ged-content-trader-body-table-row-shop:last .ged-iconbutton-bottomShop').prop('disabled', true);
                $('tr.ged-content-trader-body-table-row-shop:last .ged-iconbutton-downShop, tr.ged-content-trader-body-table-row-shop:last .ged-iconbutton-bottomShop').addClass('ui-state-disabled');
            });

            $('table#ged-content-trader-body-table-shop').on('click', '.ged-iconbutton-upShop', function () {
                currentlyEditingShopListId = parseInt($(this).attr('shoplistid'));
                var shop = shopList[currentlyEditingShopListId];

                if (shopList[currentlyEditingShopListId].Order > 0) {
                    for (var ctr = 0; ctr < shopList.length; ctr++) {
                        if (shopList[ctr].Order == (shop.Order - 1)) {
                            shopList[ctr].Order += 1;
                        }
                    }
                    shopList[currentlyEditingShopListId].Order -= 1;

                    storeShopTableData();
                }

                $(this).removeClass('ui-state-hover');
                var row = $(this).parents('tr:first');
                row.stop(true, true);
                row.effect("highlight", {}, 1800);
                row.insertBefore(row.prev());

                $('tr.ged-content-trader-body-table-row-shop .ged-iconbutton-topShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-upShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-downShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-bottomShop').removeClass('ui-state-disabled');
                $('tr.ged-content-trader-body-table-row-shop .ged-iconbutton-topShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-upShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-downShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-bottomShop').prop('disabled', false);
                $('tr.ged-content-trader-body-table-row-shop:first .ged-iconbutton-topShop, tr.ged-content-trader-body-table-row-shop:first .ged-iconbutton-upShop').addClass('ui-state-disabled');
                $('tr.ged-content-trader-body-table-row-shop:first .ged-iconbutton-topShop, tr.ged-content-trader-body-table-row-shop:first .ged-iconbutton-upShop').prop('disabled', true);
                $('tr.ged-content-trader-body-table-row-shop:last .ged-iconbutton-downShop, tr.ged-content-trader-body-table-row-shop:last .ged-iconbutton-bottomShop').prop('disabled', true);
                $('tr.ged-content-trader-body-table-row-shop:last .ged-iconbutton-downShop, tr.ged-content-trader-body-table-row-shop:last .ged-iconbutton-bottomShop').addClass('ui-state-disabled');
            });

            $('table#ged-content-trader-body-table-shop').on('click', '.ged-iconbutton-downShop', function () {
                currentlyEditingShopListId = parseInt($(this).attr('shoplistid'));
                var shop = shopList[currentlyEditingShopListId];

                if (shopList[currentlyEditingShopListId].Order < (shopList.length - 1)) {
                    for (var ctr = 0; ctr < shopList.length; ctr++) {
                        if (shopList[ctr].Order == (shop.Order + 1)) {
                            shopList[ctr].Order -= 1;
                        }
                    }
                    shopList[currentlyEditingShopListId].Order += 1;

                    storeShopTableData();
                }

                $(this).removeClass('ui-state-hover');
                var row = $(this).parents('tr:first');
                row.stop(true, true);
                row.effect("highlight", {}, 1800);
                row.insertAfter(row.next());

                $('tr.ged-content-trader-body-table-row-shop .ged-iconbutton-topShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-upShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-downShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-bottomShop').removeClass('ui-state-disabled');
                $('tr.ged-content-trader-body-table-row-shop .ged-iconbutton-topShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-upShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-downShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-bottomShop').prop('disabled', false);
                $('tr.ged-content-trader-body-table-row-shop:first .ged-iconbutton-topShop, tr.ged-content-trader-body-table-row-shop:first .ged-iconbutton-upShop').addClass('ui-state-disabled');
                $('tr.ged-content-trader-body-table-row-shop:first .ged-iconbutton-topShop, tr.ged-content-trader-body-table-row-shop:first .ged-iconbutton-upShop').prop('disabled', true);
                $('tr.ged-content-trader-body-table-row-shop:last .ged-iconbutton-downShop, tr.ged-content-trader-body-table-row-shop:last .ged-iconbutton-bottomShop').prop('disabled', true);
                $('tr.ged-content-trader-body-table-row-shop:last .ged-iconbutton-downShop, tr.ged-content-trader-body-table-row-shop:last .ged-iconbutton-bottomShop').addClass('ui-state-disabled');
            });

            $('table#ged-content-trader-body-table-shop').on('click', '.ged-iconbutton-bottomShop', function () {
                currentlyEditingShopListId = parseInt($(this).attr('shoplistid'));
                var shop = shopList[currentlyEditingShopListId];

                for (var ctr = 0; ctr < shopList.length; ctr++) {
                    if (shopList[ctr].Order > shop.Order) {
                        shopList[ctr].Order -= 1;
                    }
                }

                shopList[currentlyEditingShopListId].Order = shopList.length - 1;

                storeShopTableData();

                $(this).removeClass('ui-state-hover');
                var row = $(this).parents('tr:first');
                row.stop(true, true);
                row.effect("highlight", {}, 1800);
                row.insertAfter($('tbody#ged-content-trader-body-table-row-shop tr:last'));

                $('tr.ged-content-trader-body-table-row-shop .ged-iconbutton-topShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-upShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-downShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-bottomShop').removeClass('ui-state-disabled');
                $('tr.ged-content-trader-body-table-row-shop .ged-iconbutton-topShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-upShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-downShop, tr.ged-content-trader-body-table-row-shop .ged-iconbutton-bottomShop').prop('disabled', false);
                $('tr.ged-content-trader-body-table-row-shop:first .ged-iconbutton-topShop, tr.ged-content-trader-body-table-row-shop:first .ged-iconbutton-upShop').addClass('ui-state-disabled');
                $('tr.ged-content-trader-body-table-row-shop:first .ged-iconbutton-topShop, tr.ged-content-trader-body-table-row-shop:first .ged-iconbutton-upShop').prop('disabled', true);
                $('tr.ged-content-trader-body-table-row-shop:last .ged-iconbutton-downShop, tr.ged-content-trader-body-table-row-shop:last .ged-iconbutton-bottomShop').prop('disabled', true);
                $('tr.ged-content-trader-body-table-row-shop:last .ged-iconbutton-downShop, tr.ged-content-trader-body-table-row-shop:last .ged-iconbutton-bottomShop').addClass('ui-state-disabled');
            });
            
            $('table#ged-content-trader-body-table-proj').on('click', '.ged-iconbutton-infoProj', function () {
                currentlyEditingProjListId = parseInt($(this).attr('projlistid'));
                var proj = projList[currentlyEditingProjListId];
                $('.ged-content-trader-body-dialog-infoContent').html(proj.Note);
                $('.ged-content-trader-body-dialog-info').dialog({
                    title: proj.Name
                });
                $('.ged-content-trader-body-dialog-info').dialog('open');
            });
            
            $('table#ged-content-trader-body-table-proj').on('click', '.ged-iconbutton-editProj', function () {
                currentlyEditingProjListId = parseInt($(this).attr('projlistid'));
                var proj = projList[currentlyEditingProjListId];

                $('#dialog-addEditProj-name').val(proj.Name);
                $('#dialog-addEditProj-color').val(proj.Color);
                $('#dialog-addEditProj-type-equ').prop('checked', proj.Type == 'Equip')
                $('#dialog-addEditProj-type-exp').prop('checked', proj.Type == 'Expend')
                $('#dialog-addEditProj-type-mis').prop('checked', proj.Type == 'Misc')
                $('#dialog-addEditProj-type-cos').prop('checked', proj.Type == 'Costume')
                $('.dialog-addEditProj-type').button('refresh');
                $('#dialog-addEditProj-note').val(proj.Note);

                setupProjDialogForEdit();
                $('#ged-content-trader-body-dialog-addEditProj').dialog('open');
            });
            
            $('table#ged-content-trader-body-table-proj').on('click', '.ged-iconbutton-topProj', function () {
                currentlyEditingProjListId = parseInt($(this).attr('projlistid'));
                var proj = projList[currentlyEditingProjListId];

                for (var ctr = 0; ctr < projList.length; ctr++) {
                    if (projList[ctr].Order < proj.Order) {
                        projList[ctr].Order += 1;
                    }
                }

                projList[currentlyEditingProjListId].Order = 0;

                storeProjTableData();

                $(this).removeClass('ui-state-hover');
                var row = $(this).parents('tr:first');
                row.stop(true, true);
                row.effect("highlight", {}, 1800);
                row.insertBefore($('tbody#ged-content-trader-body-table-row-proj tr:first'));

                $('tr.ged-content-trader-body-table-row-proj .ged-iconbutton-topProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-upProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-downProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-bottomProj').removeClass('ui-state-disabled');
                $('tr.ged-content-trader-body-table-row-proj .ged-iconbutton-topProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-upProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-downProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-bottomProj').prop('disabled', false);
                $('tr.ged-content-trader-body-table-row-proj:first .ged-iconbutton-topProj, tr.ged-content-trader-body-table-row-proj:first .ged-iconbutton-upProj').addClass('ui-state-disabled');
                $('tr.ged-content-trader-body-table-row-proj:first .ged-iconbutton-topProj, tr.ged-content-trader-body-table-row-proj:first .ged-iconbutton-upProj').prop('disabled', true);
                $('tr.ged-content-trader-body-table-row-proj:last .ged-iconbutton-downProj, tr.ged-content-trader-body-table-row-proj:last .ged-iconbutton-bottomProj').prop('disabled', true);
                $('tr.ged-content-trader-body-table-row-proj:last .ged-iconbutton-downProj, tr.ged-content-trader-body-table-row-proj:last .ged-iconbutton-bottomProj').addClass('ui-state-disabled');
            });
            
            $('table#ged-content-trader-body-table-proj').on('click', '.ged-iconbutton-upProj', function () {
                currentlyEditingProjListId = parseInt($(this).attr('projlistid'));
                var proj = projList[currentlyEditingProjListId];

                if (projList[currentlyEditingProjListId].Order > 0) {
                    for (var ctr = 0; ctr < projList.length; ctr++) {
                        if (projList[ctr].Order == (proj.Order - 1)) {
                            projList[ctr].Order += 1;
                        }
                    }
                    projList[currentlyEditingProjListId].Order -= 1;

                    storeProjTableData();
                }

                $(this).removeClass('ui-state-hover');
                var row = $(this).parents('tr:first');
                row.stop(true, true);
                row.effect("highlight", {}, 1800);
                row.insertBefore(row.prev());

                $('tr.ged-content-trader-body-table-row-proj .ged-iconbutton-topProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-upProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-downProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-bottomProj').removeClass('ui-state-disabled');
                $('tr.ged-content-trader-body-table-row-proj .ged-iconbutton-topProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-upProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-downProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-bottomProj').prop('disabled', false);
                $('tr.ged-content-trader-body-table-row-proj:first .ged-iconbutton-topProj, tr.ged-content-trader-body-table-row-proj:first .ged-iconbutton-upProj').addClass('ui-state-disabled');
                $('tr.ged-content-trader-body-table-row-proj:first .ged-iconbutton-topProj, tr.ged-content-trader-body-table-row-proj:first .ged-iconbutton-upProj').prop('disabled', true);
                $('tr.ged-content-trader-body-table-row-proj:last .ged-iconbutton-downProj, tr.ged-content-trader-body-table-row-proj:last .ged-iconbutton-bottomProj').prop('disabled', true);
                $('tr.ged-content-trader-body-table-row-proj:last .ged-iconbutton-downProj, tr.ged-content-trader-body-table-row-proj:last .ged-iconbutton-bottomProj').addClass('ui-state-disabled');
            });
            
            $('table#ged-content-trader-body-table-proj').on('click', '.ged-iconbutton-downProj', function () {
                currentlyEditingProjListId = parseInt($(this).attr('projlistid'));
                var proj = projList[currentlyEditingProjListId];

                if (projList[currentlyEditingProjListId].Order < (projList.length - 1)) {
                    for (var ctr = 0; ctr < projList.length; ctr++) {
                        if (projList[ctr].Order == (proj.Order + 1)) {
                            projList[ctr].Order -= 1;
                        }
                    }
                    projList[currentlyEditingProjListId].Order += 1;

                    storeProjTableData();
                }

                $(this).removeClass('ui-state-hover');
                var row = $(this).parents('tr:first');
                row.stop(true, true);
                row.effect("highlight", {}, 1800);
                row.insertAfter(row.next());

                $('tr.ged-content-trader-body-table-row-proj .ged-iconbutton-topProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-upProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-downProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-bottomProj').removeClass('ui-state-disabled');
                $('tr.ged-content-trader-body-table-row-proj .ged-iconbutton-topProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-upProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-downProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-bottomProj').prop('disabled', false);
                $('tr.ged-content-trader-body-table-row-proj:first .ged-iconbutton-topProj, tr.ged-content-trader-body-table-row-proj:first .ged-iconbutton-upProj').addClass('ui-state-disabled');
                $('tr.ged-content-trader-body-table-row-proj:first .ged-iconbutton-topProj, tr.ged-content-trader-body-table-row-proj:first .ged-iconbutton-upProj').prop('disabled', true);
                $('tr.ged-content-trader-body-table-row-proj:last .ged-iconbutton-downProj, tr.ged-content-trader-body-table-row-proj:last .ged-iconbutton-bottomProj').prop('disabled', true);
                $('tr.ged-content-trader-body-table-row-proj:last .ged-iconbutton-downProj, tr.ged-content-trader-body-table-row-proj:last .ged-iconbutton-bottomProj').addClass('ui-state-disabled');
            });
                
            $('table#ged-content-trader-body-table-proj').on('click', '.ged-iconbutton-bottomProj', function () {
                currentlyEditingProjListId = parseInt($(this).attr('projlistid'));
                var proj = projList[currentlyEditingProjListId];

                for (var ctr = 0; ctr < projList.length; ctr++) {
                    if (projList[ctr].Order > proj.Order) {
                        projList[ctr].Order -= 1;
                    }
                }

                projList[currentlyEditingProjListId].Order = projList.length - 1;

                storeProjTableData();

                $(this).removeClass('ui-state-hover');
                var row = $(this).parents('tr:first');
                row.stop(true, true);
                row.effect("highlight", {}, 1800);
                row.insertAfter($('tbody#ged-content-trader-body-table-row-proj tr:last'));

                $('tr.ged-content-trader-body-table-row-proj .ged-iconbutton-topProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-upProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-downProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-bottomProj').removeClass('ui-state-disabled');
                $('tr.ged-content-trader-body-table-row-proj .ged-iconbutton-topProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-upProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-downProj, tr.ged-content-trader-body-table-row-proj .ged-iconbutton-bottomProj').prop('disabled', false);
                $('tr.ged-content-trader-body-table-row-proj:first .ged-iconbutton-topProj, tr.ged-content-trader-body-table-row-proj:first .ged-iconbutton-upProj').addClass('ui-state-disabled');
                $('tr.ged-content-trader-body-table-row-proj:first .ged-iconbutton-topProj, tr.ged-content-trader-body-table-row-proj:first .ged-iconbutton-upProj').prop('disabled', true);
                $('tr.ged-content-trader-body-table-row-proj:last .ged-iconbutton-downProj, tr.ged-content-trader-body-table-row-proj:last .ged-iconbutton-bottomProj').prop('disabled', true);
                $('tr.ged-content-trader-body-table-row-proj:last .ged-iconbutton-downProj, tr.ged-content-trader-body-table-row-proj:last .ged-iconbutton-bottomProj').addClass('ui-state-disabled');
            });

            initializeAddEditItemDialog();
            initializeAddEditShopDialog();
            initializeAddEditProjDialog();
        }

        function initializeSurveyorContent() {
            $('#ged-iconbutton-refreshMember').button({ icons: { primary: 'ui-icon-refresh' } });
            $('#ged-iconbutton-addMember').button({ icons: { primary: 'ui-icon-circle-plus' } });
            $('#ged-iconbutton-resetMember').button({ icons: { primary: 'ui-icon-alert' } });

            $('.ged-content-surveyor-body-progressbar').progressbar({
                value: 0
            });

            $('#ged-iconbutton-refreshMember').click(function () {
                reloadMembTable();
                displayMessage('info', 'Family Table updated.');
            });

            $('.ged-content-surveyor-body-dialog-resetConfirmation').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 600,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Reset',
                        click: function () {
                            seedMembList();
                            reloadMembTable();
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });

            $('#ged-iconbutton-resetMember').click(function () {
                $('.ged-content-surveyor-body-dialog-resetConfirmation').dialog('open');
            });

            $('.ged-content-surveyor-body-dialog-info').dialog({
                autoOpen: false,
                resizable: false,
                width: 500,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Close',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });

            $('div#ged-content-surveyor-holder').on('click', '.ged-iconbutton-levelDownMemb', function () {
                currentlyEditingMembListId = parseInt($(this).attr('memblistid'));
                var memb = membList[currentlyEditingMembListId];

                $(this).removeClass('ui-state-hover');
                var row = $(this).parent().parent().parent();

                if (memb.Level > 1) {
                    memb.Level -= 1;

                    membList[currentlyEditingMembListId].Level = memb.Level;

                    row.find('.ged-content-surveyor-member-level').html('Level ' + memb.Level);
                    row.find('.ged-content-surveyor-member-level').prop('style', getMembStyle(memb.Level));

                    if (memb.Level > 1 && memb.Level < 140) {
                        row.find('.ged-iconbutton-levelDownMemb').removeClass('ui-state-disabled');
                        row.find('.ged-iconbutton-levelDownMemb').prop('disabled', false);
                        row.find('.ged-iconbutton-levelUpMemb').removeClass('ui-state-disabled');
                        row.find('.ged-iconbutton-levelUpMemb').prop('disabled', false);
                    }
                    else if (memb.Level == 1) {
                        row.find('.ged-iconbutton-levelDownMemb').prop('disabled', true);
                        row.find('.ged-iconbutton-levelDownMemb').addClass('ui-state-disabled');
                    }

                    updateFamilyPointSystem(true);
                }
            });

            $('div#ged-content-surveyor-holder').on('click', '.ged-iconbutton-levelUpMemb', function () {
                currentlyEditingMembListId = parseInt($(this).attr('memblistid'));
                var memb = membList[currentlyEditingMembListId];

                $(this).removeClass('ui-state-hover');
                var row = $(this).parent().parent().parent();

                if (memb.Level < 140) {
                    memb.Level += 1;

                    membList[currentlyEditingMembListId].Level = memb.Level;

                    row.find('.ged-content-surveyor-member-level').html('Level ' + memb.Level);
                    row.find('.ged-content-surveyor-member-level').prop('style', getMembStyle(memb.Level));

                    if (memb.Level > 1 && memb.Level < 140) {
                        row.find('.ged-iconbutton-levelDownMemb').removeClass('ui-state-disabled');
                        row.find('.ged-iconbutton-levelDownMemb').prop('disabled', false);
                        row.find('.ged-iconbutton-levelUpMemb').removeClass('ui-state-disabled');
                        row.find('.ged-iconbutton-levelUpMemb').prop('disabled', false);
                    }
                    else if (memb.Level == 140) {
                        row.find('.ged-iconbutton-levelUpMemb').prop('disabled', true);
                        row.find('.ged-iconbutton-levelUpMemb').addClass('ui-state-disabled');
                    }

                    updateFamilyPointSystem(true);
                }
            });

            $('div#ged-content-surveyor-holder').on('click', '.ged-iconbutton-editMemb', function () {
                currentlyEditingMembListId = parseInt($(this).attr('memblistid'));
                var memb = membList[currentlyEditingMembListId];
                
                $("#dialog-addEditMemb-type").val(memb.Type);
                $("#dialog-addEditMemb-type").selectmenu('refresh');
                $('#dialog-addEditMemb-level').val(memb.Level);
                $('#dialog-addEditMemb-note').val(memb.Note);

                setupMembDialogForEdit();
                $('#ged-content-surveyor-body-dialog-addEditMemb').dialog('open');
            });

            $('div#ged-content-surveyor-holder').on('click', '.ged-iconbutton-infoMemb', function () {
                currentlyEditingMembListId = parseInt($(this).attr('memblistid'));
                var memb = membList[currentlyEditingMembListId];
                $('.ged-content-surveyor-body-dialog-infoContent').html(memb.Note);
                $('.ged-content-surveyor-body-dialog-info').dialog({
                    title: memb.Type
                });
                $('.ged-content-surveyor-body-dialog-info').dialog('open');
            });

            initializeAddEditMembDialog();
        }

        function initializeReminderContent() {
            $('#ged-iconbutton-refreshAlarm').button({ icons: { primary: 'ui-icon-pause' } });
            $('#ged-iconbutton-addAlarm').button({ icons: { primary: 'ui-icon-circle-plus' } });
            $('#ged-iconbutton-resetReminder').button({ icons: { primary: 'ui-icon-alert' } });

            $('#ged-iconbutton-refreshAlarm').click(function () {
                snoozeLink();
            });

            $('.ged-content-reminder-body-dialog-resetConfirmation').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 600,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Reset',
                        click: function () {
                            seedAlrmList();
                            reloadAlrmTable();
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });

            $('#ged-iconbutton-resetReminder').click(function () {
                $('.ged-content-reminder-body-dialog-resetConfirmation').dialog('open');
            });

            $('.ged-content-reminder-body-dialog-info').dialog({
                autoOpen: false,
                resizable: false,
                width: 500,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Close',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });

            $('table#ged-content-reminder-body-table').on('click', '.ged-iconbutton-infoAlrm', function () {
                currentlyEditingAlrmListId = parseInt($(this).attr('alrmlistid'));
                var alrm = alrmList[currentlyEditingAlrmListId];
                $('.ged-content-reminder-body-dialog-infoContent').html(alrm.Note);
                $('.ged-content-reminder-body-dialog-info').dialog({
                    title: alrm.Name
                });
                $('.ged-content-reminder-body-dialog-info').dialog('open');
            });

            $('table#ged-content-reminder-body-table').on('click', '.ged-iconbutton-editAlrm', function () {
                currentlyEditingAlrmListId = parseInt($(this).attr('alrmlistid'));
                var alrm = alrmList[currentlyEditingAlrmListId];

                $('#dialog-addEditAlrm-name').val(alrm.Name);
                $('#dialog-addEditAlrm-switch').prop('checked', alrm.IsOn);
                $('#dialog-addEditAlrm-switch').button({ icons: { primary: alrm.IsOn ? 'ui-icon-circle-check' : 'ui-icon-circle-close' }, label: alrm.IsOn ? 'Enabled' : 'Disabled' });
                $('#dialog-addEditAlrm-switch').button('refresh');
                $('#dialog-addEditAlrm-daily').prop('checked', alrm.IsDaily);
                $('#dialog-addEditAlrm-daily').button({ icons: { primary: alrm.IsDaily ? 'ui-icon-circle-check' : 'ui-icon-circle-close' } });
                $('#dialog-addEditAlrm-daily').button('refresh');
                $('#dialog-addEditAlrm-week-sun').prop('checked', alrm.DayList.indexOf('0') != -1)
                $('#dialog-addEditAlrm-week-mon').prop('checked', alrm.DayList.indexOf('1') != -1)
                $('#dialog-addEditAlrm-week-tue').prop('checked', alrm.DayList.indexOf('2') != -1)
                $('#dialog-addEditAlrm-week-wed').prop('checked', alrm.DayList.indexOf('3') != -1)
                $('#dialog-addEditAlrm-week-thu').prop('checked', alrm.DayList.indexOf('4') != -1)
                $('#dialog-addEditAlrm-week-fri').prop('checked', alrm.DayList.indexOf('5') != -1)
                $('#dialog-addEditAlrm-week-sat').prop('checked', alrm.DayList.indexOf('6') != -1)
                $('.dialog-addEditAlrm-week').button('refresh');
                $('.dialog-addEditAlrm-week').button({ disabled: alrm.IsDaily });
                $('#dialog-addEditAlrm-timeStart').val(alrm.TimeStart)
                $('#dialog-addEditAlrm-timeEnd').val(alrm.TimeEnd)
                $('#dialog-addEditAlrm-note').val(alrm.Note);

                setupAlrmDialogForEdit();
                $('#ged-content-reminder-body-dialog-addEditAlrm').dialog('open');
            });

            initializeAddEditAlrmDialog();
        }

        function initializeMemoirContent() {
            $('#ged-iconbutton-refreshMemo').button({ icons: { primary: 'ui-icon-refresh' } });

            $('#ged-iconbutton-refreshMemo').click(function () {
                reloadMemoTable();
            });

            $("#ged-content-memoir-text").on("change keyup paste", function () {
                var currentVal = $(this).val();
                if (currentVal == memoList) {
                    return;
                }
                memoList = currentVal;
                storeMemoTableData();
            });
        }

        function initializeAllContent() {
            $('table#ged-content-raider-body-table, table#ged-content-collector-body-table, table#ged-content-trader-body-table-item, table#ged-content-trader-body-table-shop, table#ged-content-trader-body-table-proj, table#ged-content-reminder-body-table, div#ged-content-surveyor-holder').on('mouseenter', 'button.ged-hover, label.ged-hover', function () {
                $(this).addClass('ui-state-hover');
            });

            $('table#ged-content-raider-body-table, table#ged-content-collector-body-table, table#ged-content-trader-body-table-item, table#ged-content-trader-body-table-shop, table#ged-content-trader-body-table-proj, table#ged-content-reminder-body-table, div#ged-content-surveyor-holder').on('mouseleave', 'button.ged-hover, label.ged-hover', function () {
                $(this).removeClass('ui-state-hover');
            });

            $('#ged-message').on('mouseenter', 'span.ged-message-hover', function () {
                $(this).addClass('ui-state-hover');
            });

            $('#ged-message').on('mouseleave', 'span.ged-message-hover', function () {
                $(this).removeClass('ui-state-hover');
            });

            $('table#ged-content-raider-body-table, table#ged-content-collector-body-table, table#ged-content-trader-body-table-item, table#ged-content-trader-body-table-shop, table#ged-content-trader-body-table-proj, table#ged-content-reminder-body-table, div#ged-content-surveyor-holder').on('focusin', 'button.ged-button', function () {
                $(this).addClass('ui-state-focus');
            });

            $('table#ged-content-raider-body-table, table#ged-content-collector-body-table, table#ged-content-trader-body-table-item, table#ged-content-trader-body-table-shop, table#ged-content-trader-body-table-proj, table#ged-content-reminder-body-table, div#ged-content-surveyor-holder').on('focusout', 'button.ged-button', function () {
                $(this).removeClass('ui-state-focus');
            });

            $('table#ged-content-raider-body-table, table#ged-content-collector-body-table, table#ged-content-trader-body-table-item, table#ged-content-trader-body-table-shop, table#ged-content-trader-body-table-proj, table#ged-content-reminder-body-table, div#ged-content-surveyor-holder').on('mousedown', 'button.ged-button', function () {
                $(this).addClass('ui-state-active');
            });

            $('table#ged-content-raider-body-table, table#ged-content-collector-body-table, table#ged-content-trader-body-table-item, table#ged-content-trader-body-table-shop, table#ged-content-trader-body-table-proj, table#ged-content-reminder-body-table, div#ged-content-surveyor-holder').on('mouseup', 'button.ged-button', function () {
                $(this).removeClass('ui-state-active');
            });
        }
        
        function initializeAddEditRaidDialog() {
            $('#ged-content-raider-body-dialog-addEditRaid').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 730,
                dialogClass: 'no-close'
            });

            $('#ged-iconbutton-addRaid').click(function () {
                setupRaidDialogForAdd();
                $('#ged-content-raider-body-dialog-addEditRaid').dialog('open');
            });

            $('#dialog-addEditRaid-repeatCount').mask('N##0', { translation: { 'N': { pattern: /-/, optional: true } } });
            $('#dialog-addEditRaid-repeatTarget').mask('N##0', { translation: { 'N': { pattern: /-/, optional: true } } });

            $('#dialog-addEditRaid-daily').button({ icons: { primary: 'ui-icon-circle-check' } });
            $('#dialog-addEditRaid-daily').click(function () {
                if ($(this).prop('checked') == true) {
                    $('.dialog-addEditRaid-week').button({ disabled: true });
                    $(this).button({ icons: { primary: 'ui-icon-circle-check' } });
                }
                else {
                    $('.dialog-addEditRaid-week').button({ disabled: false });
                    $(this).button({ icons: { primary: 'ui-icon-circle-close' } });
                }
            });

            $('#dialog-addEditRaid-week').buttonset();
            $('.dialog-addEditRaid-week').button({ disabled: true });

            $('#dialog-addEditRaid-time').button({ icons: { primary: 'ui-icon-circle-close' } });
            $('#dialog-addEditRaid-time').click(function () {
                if ($(this).prop('checked') == true) {
                    $('#dialog-addEditRaid-timeStart').prop('disabled', false);
                    $('#dialog-addEditRaid-timeEnd').prop('disabled', false);
                    if ($('#dialog-addEditRaid-timeStart').val() == '' && $('#dialog-addEditRaid-timeEnd').val() == '') {
                        $('#dialog-addEditRaid-timeStart').val('00:00');
                        $('#dialog-addEditRaid-timeEnd').val('00:00');
                    }
                    $(this).button({ icons: { primary: 'ui-icon-circle-check' } });
                }
                else {
                    $('#dialog-addEditRaid-timeStart').prop('disabled', true);
                    $('#dialog-addEditRaid-timeEnd').prop('disabled', true);
                    $(this).button({ icons: { primary: 'ui-icon-circle-close' } });
                }
            });

            $('#dialog-addEditRaid-timeStart').mask('00:00');
            $('#dialog-addEditRaid-timeStart').timepicker({
                timeFormat: 'HH:mm',
                interval: 5,
                change: function(time) {
                    var pickerValue = $(this).val();
                    var currentTimeDate = new Date('01/01/2000 ' + formatTimeTo12H(pickerValue));
                    var timeStartDate = new Date('01/01/2000 ' + formatTimeTo12H($(this).val()));
                    var timeEndDate = new Date('01/01/2000 ' + formatTimeTo12H($('#dialog-addEditRaid-timeEnd').val()));
                    if (timeEndDate < timeStartDate) {
                        $('#dialog-addEditRaid-timeEnd').val(pickerValue);
                    }
                    $('#dialog-addEditRaid-timeEnd').data('TimePicker').options.minTime = pickerValue;
                }
            });
            $('#dialog-addEditRaid-timeStart').prop('disabled', true);

            $('#dialog-addEditRaid-timeEnd').mask('00:00');
            $('#dialog-addEditRaid-timeEnd').timepicker({
                timeFormat: 'HH:mm',
                interval: 5,
                change: function(time) {
                    var pickerValue = $(this).val();
                    var currentTimeDate = new Date('01/01/2000 ' + formatTimeTo12H(pickerValue));
                    var timeStartDate = new Date('01/01/2000 ' + formatTimeTo12H($('#dialog-addEditRaid-timeStart').val()));
                    var timeEndDate = new Date('01/01/2000 ' + formatTimeTo12H($(this).val()));
                    if (timeStartDate > timeEndDate) {
                        $('#dialog-addEditRaid-timeStart').val(pickerValue);
                    }
                    $('#dialog-addEditRaid-timeStart').data('TimePicker').options.maxTime = pickerValue;
                }
            });
            $('#dialog-addEditRaid-timeEnd').prop('disabled', true);

            $('#dialog-addEditRaid-cooldown').button({ icons: { primary: 'ui-icon-circle-close' } });
            $('#dialog-addEditRaid-cooldown').click(function () {
                if ($(this).prop('checked') == true) {
                    $('#dialog-addEditRaid-cooldownDuration').prop('disabled', false);
                    if ($('#dialog-addEditRaid-cooldownDuration').val() == '') {
                        $('#dialog-addEditRaid-cooldownDuration').val('1');
                    }
                    $(this).button({ icons: { primary: 'ui-icon-circle-check' } });
                }
                else {
                    $('#dialog-addEditRaid-cooldownDuration').prop('disabled', true);
                    $(this).button({ icons: { primary: 'ui-icon-circle-close' } });
                }
            });

            $('#dialog-addEditRaid-cooldownDuration').mask('#0');
            $('#dialog-addEditRaid-cooldownDuration').prop('disabled', true);

            $('#dialog-addEditRaid-duration').button({ icons: { primary: 'ui-icon-circle-close' } });
            $('#dialog-addEditRaid-duration').click(function () {
                if ($(this).prop('checked') == true) {
                    $('#dialog-addEditRaid-durationStart').prop('disabled', false);
                    $('#dialog-addEditRaid-durationEnd').prop('disabled', false);
                    if ($('#dialog-addEditRaid-durationStart').val() == '' && $('#dialog-addEditRaid-durationEnd').val() == '') {
                        var currentDate = new Date();
                        var currentDateString = $.format.date(currentDate.toString(), "MM/dd/yyyy");
                        $('#dialog-addEditRaid-durationStart').val(currentDateString);
                        $('#dialog-addEditRaid-durationEnd').val(currentDateString);
                    }
                    $(this).button({ icons: { primary: 'ui-icon-circle-check' } });
                }
                else {
                    $('#dialog-addEditRaid-durationStart').prop('disabled', true);
                    $('#dialog-addEditRaid-durationEnd').prop('disabled', true);
                    $(this).button({ icons: { primary: 'ui-icon-circle-close' } });
                }
            });

            $('#dialog-addEditRaid-durationStart').datepicker({
                onSelect: function (selectedDate) {
                    $("#dialog-addEditRaid-durationEnd").datepicker("option", "minDate", selectedDate);
                }
            });
            $('#dialog-addEditRaid-durationEnd').datepicker({
                onSelect: function (selectedDate) {
                    $("#dialog-addEditRaid-durationStart").datepicker("option", "maxDate", selectedDate);
                }
            });
            
            $('#ged-content-raider-body-dialog-addEditRaid').tooltip();

            $('.ged-content-raider-body-dialog-deleteConfirmation').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 600,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Delete',
                        click: function () {
                            deleteCurrentlyEditingRaid();
                            $(this).dialog('close');
                            $('#ged-content-raider-body-dialog-addEditRaid').dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });

            resetAddEditRaidDialog()
        }

        function initializeAddEditCharDialog() {
            $('#ged-content-collector-body-dialog-addEditChar').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 510,
                dialogClass: 'no-close'
            });

            $('#ged-iconbutton-addCharacter').click(function () {
                setupCharDialogForAdd();
                $('#ged-content-collector-body-dialog-addEditChar').dialog('open');
            });

            $('#dialog-addEditChar-rank').buttonset();
            $('.dialog-addEditChar-rankLabel').css({ 'margin-right': '-0.28em' });

            $('.ged-content-collector-body-dialog-deleteConfirmation').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 600,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Delete',
                        click: function () {
                            deleteCurrentlyEditingChar();
                            $(this).dialog('close');
                            $('#ged-content-collector-body-dialog-addEditChar').dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });

            resetAddEditCharDialog()
        }

        function initializeAddEditItemDialog() {
            $('#ged-content-trader-body-dialog-addEditItem').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 510,
                dialogClass: 'no-close'
            });

            $('#ged-iconbutton-addItem').click(function () {
                setupItemDialogForAdd();
                $('#ged-content-trader-body-dialog-addEditItem').dialog('open');
            });

            $('#dialog-addEditItem-price').mask('00000000000', { reverse: true,
                onChange: function (cep) {
                    var price = $('#dialog-addEditItem-price').cleanVal();
                    var color = getItemColor(price);
                    $('#dialog-addEditItem-price-display').text(commaSeparateNumber(price));
                    $('#dialog-addEditItem-price-display').css('color', color);
                }
            });

            $('#dialog-addEditItem-currency').change(function () {
                $('#dialog-addEditItem-price-display-currency').text($('#dialog-addEditItem-currency input:checked').val() == 'Vis' ? ' Vis' : ' Feso');
                $('#dialog-addEditItem-price-display-currency').css('color', $('#dialog-addEditItem-currency input:checked').val() == 'Vis' ? 'gold' : 'lime');
            });

            $('#dialog-addEditItem-currency').buttonset();
            $('.dialog-addEditItem-currencyLabel').css({ 'margin-right': '-0.28em' });

            $('#dialog-addEditItem-type').buttonset();
            $('.dialog-addEditItem-typeLabel').css({ 'margin-right': '-0.28em' });

            $('.ged-content-trader-body-dialog-deleteConfirmationItem').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 600,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Delete',
                        click: function () {
                            deleteCurrentlyEditingItem();
                            $(this).dialog('close');
                            $('#ged-content-trader-body-dialog-addEditItem').dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });

            resetAddEditItemDialog()
        }

        function initializeAddEditShopDialog() {
            $('#ged-content-trader-body-dialog-addEditShop').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 510,
                dialogClass: 'no-close'
            });

            $('#ged-iconbutton-addShop').click(function () {
                setupShopDialogForAdd();
                $('#ged-content-trader-body-dialog-addEditShop').dialog('open');
            });

            initializeShopNameSelectMenu();

            $('.ged-content-trader-body-dialog-deleteConfirmationShop').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 600,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Delete',
                        click: function () {
                            deleteCurrentlyEditingShop();
                            $(this).dialog('close');
                            $('#ged-content-trader-body-dialog-addEditShop').dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });

            resetAddEditShopDialog()
        }

        function initializeShopNameSelectMenu() {
            var html = '';
            var altHtml = '';
            if (itemList.length > 0) {
                for (var ctr = 0; ctr < itemList.length; ctr++) {
                    if (itemList[ctr].Currency == 'Vis') {
                        html += '<option value="' + itemList[ctr].Name + '">' + itemList[ctr].Name + '</option>';
                    }
                    else {
                        altHtml += '<option value="' + itemList[ctr].Name + '">' + itemList[ctr].Name + '</option>';
                    }
                }
                if (html == '') {
                    html = altHtml;
                }
            }
            if (html == '') {
                html = '<option value="Unknown" selected="true">Item List is empty.</option>';
            }
            $('#dialog-addEditShop-name').html(html);
            $('#dialog-addEditShop-name').selectmenu();
            $('#dialog-addEditShop-name').selectmenu("menuWidget").addClass('dialog-addEditShop-type-overflow');
            $('#dialog-addEditShop-name').selectmenu("refresh");
        }

        function initializeAddEditProjDialog() {
            $('#ged-content-trader-body-dialog-addEditProj').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 510,
                dialogClass: 'no-close'
            });

            $('#ged-iconbutton-addProj').click(function () {
                setupProjDialogForAdd();
                $('#ged-content-trader-body-dialog-addEditProj').dialog('open');
            });

            $('#dialog-addEditProj-type').buttonset();
            $('.dialog-addEditProj-typeLabel').css({ 'margin-right': '-0.28em' });

            $('.ged-content-trader-body-dialog-deleteConfirmationProj').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 600,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Delete',
                        click: function () {
                            deleteCurrentlyEditingProj();
                            $(this).dialog('close');
                            $('#ged-content-trader-body-dialog-addEditProj').dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });

            resetAddEditProjDialog()
        }

        function initializeAddEditMembDialog() {
            $('#ged-content-surveyor-body-dialog-addEditMemb').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 510,
                dialogClass: 'no-close'
            });

            $('#ged-iconbutton-addMember').click(function () {
                setupMembDialogForAdd();
                $('#ged-content-surveyor-body-dialog-addEditMemb').dialog('open');
            });

            initializeMembNameSelectMenu();
            
            $('#dialog-addEditMemb-level').spinner({
                min: 1,
                max: 140,
                numberFormat: "n",
                page: 10
            });

            $('#dialog-addEditMemb-level').mask('##0');

            $('.ged-content-surveyor-body-dialog-deleteConfirmation').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 600,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Delete',
                        click: function () {
                            deleteCurrentlyEditingMemb();
                            $(this).dialog('close');
                            $('#ged-content-surveyor-body-dialog-addEditMemb').dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });

            resetAddEditMembDialog()
        }

        function initializeMembNameSelectMenu() {
            var html = '';
            var altHtml = '';
            if (charList.length > 0) {
                for (var ctr = 0; ctr < charList.length; ctr++) {
                    if (charList[ctr].IsCollected) {
                        html += '<option value="' + charList[ctr].Name + '">' + charList[ctr].Name + '</option>';
                    }
                    else {
                        altHtml += '<option value="' + charList[ctr].Name + '">' + charList[ctr].Name + '</option>';
                    }
                }
                if (html == '') {
                    html = altHtml;
                }
            }
            else {
                html = '<option value="Unknown" selected="true">Character List is empty.</option>';
            }
            $('#dialog-addEditMemb-type').html(html);
            $('#dialog-addEditMemb-type').selectmenu();
            $('#dialog-addEditMemb-type').selectmenu("menuWidget").addClass('dialog-addEditMemb-type-overflow');
            $('#dialog-addEditMemb-type').selectmenu("refresh");
        }

        function initializeAddEditAlrmDialog() {
            $('#ged-content-reminder-body-dialog-addEditAlrm').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 730,
                dialogClass: 'no-close'
            });

            $('#ged-iconbutton-addAlarm').click(function () {
                setupAlrmDialogForAdd();
                $('#ged-content-reminder-body-dialog-addEditAlrm').dialog('open');
            });

            $('#dialog-addEditAlrm-switch').button({ icons: { primary: 'ui-icon-circle-check' }, label: 'Enabled' });
            $('#dialog-addEditAlrm-switch').click(function () {
                if ($(this).prop('checked') == true) {
                    $(this).button({ icons: { primary: 'ui-icon-circle-check' }, label: 'Enabled' });
                }
                else {
                    $(this).button({ icons: { primary: 'ui-icon-circle-close' }, label: 'Disabled' });
                }
            });

            $('#dialog-addEditAlrm-daily').button({ icons: { primary: 'ui-icon-circle-check' } });
            $('#dialog-addEditAlrm-daily').click(function () {
                if ($(this).prop('checked') == true) {
                    $('.dialog-addEditAlrm-week').button({ disabled: true });
                    $(this).button({ icons: { primary: 'ui-icon-circle-check' } });
                }
                else {
                    $('.dialog-addEditAlrm-week').button({ disabled: false });
                    $(this).button({ icons: { primary: 'ui-icon-circle-close' } });
                }
            });

            $('#dialog-addEditAlrm-week').buttonset();
            $('.dialog-addEditAlrm-week').button({ disabled: true });

            $('#dialog-addEditAlrm-timeStart').mask('00:00');
            $('#dialog-addEditAlrm-timeStart').timepicker({
                timeFormat: 'HH:mm',
                interval: 5,
                change: function (time) {
                    var pickerValue = $(this).val();
                    var currentTimeDate = new Date('01/01/2000 ' + formatTimeTo12H(pickerValue));
                    var timeStartDate = new Date('01/01/2000 ' + formatTimeTo12H($(this).val()));
                    var timeEndDate = new Date('01/01/2000 ' + formatTimeTo12H($('#dialog-addEditAlrm-timeEnd').val()));
                    if (timeEndDate < timeStartDate) {
                        $('#dialog-addEditAlrm-timeEnd').val(pickerValue);
                    }
                    $('#dialog-addEditAlrm-timeEnd').data('TimePicker').options.minTime = pickerValue;
                }
            });

            $('#dialog-addEditAlrm-timeEnd').mask('00:00');
            $('#dialog-addEditAlrm-timeEnd').timepicker({
                timeFormat: 'HH:mm',
                interval: 5,
                change: function (time) {
                    var pickerValue = $(this).val();
                    var currentTimeDate = new Date('01/01/2000 ' + formatTimeTo12H(pickerValue));
                    var timeStartDate = new Date('01/01/2000 ' + formatTimeTo12H($('#dialog-addEditAlrm-timeStart').val()));
                    var timeEndDate = new Date('01/01/2000 ' + formatTimeTo12H($(this).val()));
                    if (timeStartDate > timeEndDate) {
                        $('#dialog-addEditAlrm-timeStart').val(pickerValue);
                    }
                    $('#dialog-addEditAlrm-timeStart').data('TimePicker').options.maxTime = pickerValue;
                }
            });

            $('#ged-content-reminder-body-dialog-addEditAlrm').tooltip();

            $('.ged-content-reminder-body-dialog-deleteConfirmation').dialog({
                modal: true,
                autoOpen: false,
                resizable: false,
                width: 600,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Delete',
                        click: function () {
                            deleteCurrentlyEditingAlrm();
                            $(this).dialog('close');
                            $('#ged-content-reminder-body-dialog-addEditAlrm').dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });

            resetAddEditAlrmDialog()
        }

        // Dialog Functions
        function setupRaidDialogForAdd() {
            resetAddEditRaidDialog();
            $('#ged-content-raider-body-dialog-addEditRaid').dialog({
                title: 'Add Raid / Title',
                buttons: [
                    {
                        text: 'Reset',
                        click: function () {
                            resetAddEditRaidDialog();
                        }
                    },
                    {
                        text: 'Add',
                        click: function () {
                            saveAddEditRaidDialog('Add');
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ],
                open: function () {
                    $(this).parent().find('.ui-dialog-buttonset').css({ 'width': '100%', 'text-align': 'right' })
                    $(this).parent().find('button:contains("Reset")').css({ 'float': 'left', 'margin-left': '22px' });
                }
            });
        }

        function setupRaidDialogForEdit() {
            $('#ged-content-raider-body-dialog-addEditRaid').dialog({
                title: 'Edit Raid / Title',
                buttons: [
                    {
                        text: 'Delete',
                        click: function () {
                            $('.ged-content-raider-body-dialog-deleteConfirmation').dialog('open');
                        }
                    },
                    {
                        text: 'Save',
                        click: function () {
                            saveAddEditRaidDialog('Edit');
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ],
                open: function () {
                    $(this).parent().find('.ui-dialog-buttonset').css({ 'width': '100%', 'text-align': 'right' })
                    $(this).parent().find('button:contains("Delete")').css({ 'float': 'left', 'margin-left': '22px' });
                }
            });
        }

        function setupCharDialogForAdd() {
            resetAddEditCharDialog();
            $('#ged-content-collector-body-dialog-addEditChar').dialog({
                title: 'Add Character',
                buttons: [
                    {
                        text: 'Reset',
                        click: function () {
                            resetAddEditCharDialog();
                        }
                    },
                    {
                        text: 'Add',
                        click: function () {
                            saveAddEditCharDialog('Add');
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ],
                open: function () {
                    $(this).parent().find('.ui-dialog-buttonset').css({ 'width': '100%', 'text-align': 'right' })
                    $(this).parent().find('button:contains("Reset")').css({ 'float': 'left', 'margin-left': '22px' });
                }
            });
        }

        function setupCharDialogForEdit() {
            $('#ged-content-collector-body-dialog-addEditChar').dialog({
                title: 'Edit Character',
                buttons: [
                    {
                        text: 'Delete',
                        click: function () {
                            $('.ged-content-collector-body-dialog-deleteConfirmation').dialog('open');
                        }
                    },
                    {
                        text: 'Save',
                        click: function () {
                            saveAddEditCharDialog('Edit');
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ],
                open: function () {
                    $(this).parent().find('.ui-dialog-buttonset').css({ 'width': '100%', 'text-align': 'right' })
                    $(this).parent().find('button:contains("Delete")').css({ 'float': 'left', 'margin-left': '22px' });
                }
            });
        }

        function setupItemDialogForAdd() {
            resetAddEditItemDialog();
            $('#ged-content-trader-body-dialog-addEditItem').dialog({
                title: 'Add Item',
                buttons: [
                    {
                        text: 'Reset',
                        click: function () {
                            resetAddEditItemDialog();
                        }
                    },
                    {
                        text: 'Add',
                        click: function () {
                            saveAddEditItemDialog('Add');
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ],
                open: function () {
                    $(this).parent().find('.ui-dialog-buttonset').css({ 'width': '100%', 'text-align': 'right' })
                    $(this).parent().find('button:contains("Reset")').css({ 'float': 'left', 'margin-left': '22px' });
                }
            });
        }

        function setupItemDialogForEdit() {
            $('#ged-content-trader-body-dialog-addEditItem').dialog({
                title: 'Edit Item',
                buttons: [
                    {
                        text: 'Delete',
                        click: function () {
                            $('.ged-content-trader-body-dialog-deleteConfirmationItem').dialog('open');
                        }
                    },
                    {
                        text: 'Save',
                        click: function () {
                            saveAddEditItemDialog('Edit');
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ],
                open: function () {
                    $(this).parent().find('.ui-dialog-buttonset').css({ 'width': '100%', 'text-align': 'right' })
                    $(this).parent().find('button:contains("Delete")').css({ 'float': 'left', 'margin-left': '22px' });
                }
            });
        }

        function setupShopDialogForAdd() {
            initializeShopNameSelectMenu();
            resetAddEditShopDialog();
            $('#ged-content-trader-body-dialog-addEditShop').dialog({
                title: 'Add Item',
                buttons: [
                    {
                        text: 'Reset',
                        click: function () {
                            resetAddEditShopDialog();
                        }
                    },
                    {
                        text: 'Add',
                        click: function () {
                            saveAddEditShopDialog('Add');
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ],
                open: function () {
                    $(this).parent().find('.ui-dialog-buttonset').css({ 'width': '100%', 'text-align': 'right' })
                    $(this).parent().find('button:contains("Reset")').css({ 'float': 'left', 'margin-left': '22px' });
                }
            });
        }

        function setupShopDialogForEdit() {
            $('#ged-content-trader-body-dialog-addEditShop').dialog({
                title: 'Edit Item',
                buttons: [
                    {
                        text: 'Delete',
                        click: function () {
                            $('.ged-content-trader-body-dialog-deleteConfirmationShop').dialog('open');
                        }
                    },
                    {
                        text: 'Save',
                        click: function () {
                            saveAddEditShopDialog('Edit');
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ],
                open: function () {
                    $(this).parent().find('.ui-dialog-buttonset').css({ 'width': '100%', 'text-align': 'right' })
                    $(this).parent().find('button:contains("Delete")').css({ 'float': 'left', 'margin-left': '22px' });
                }
            });
        }

        function setupProjDialogForAdd() {
            resetAddEditProjDialog();
            $('#ged-content-trader-body-dialog-addEditProj').dialog({
                title: 'Add Project',
                buttons: [
                    {
                        text: 'Reset',
                        click: function () {
                            resetAddEditProjDialog();
                        }
                    },
                    {
                        text: 'Add',
                        click: function () {
                            saveAddEditProjDialog('Add');
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ],
                open: function () {
                    $(this).parent().find('.ui-dialog-buttonset').css({ 'width': '100%', 'text-align': 'right' })
                    $(this).parent().find('button:contains("Reset")').css({ 'float': 'left', 'margin-left': '22px' });
                }
            });
        }

        function setupProjDialogForEdit() {
            $('#ged-content-trader-body-dialog-addEditProj').dialog({
                title: 'Edit Project',
                buttons: [
                    {
                        text: 'Delete',
                        click: function () {
                            $('.ged-content-trader-body-dialog-deleteConfirmationProj').dialog('open');
                        }
                    },
                    {
                        text: 'Save',
                        click: function () {
                            saveAddEditProjDialog('Edit');
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ],
                open: function () {
                    $(this).parent().find('.ui-dialog-buttonset').css({ 'width': '100%', 'text-align': 'right' })
                    $(this).parent().find('button:contains("Delete")').css({ 'float': 'left', 'margin-left': '22px' });
                }
            });
        }

        function setupMembDialogForAdd() {
            initializeMembNameSelectMenu();
            resetAddEditMembDialog();
            $('#ged-content-surveyor-body-dialog-addEditMemb').dialog({
                title: 'Add Member',
                buttons: [
                    {
                        text: 'Reset',
                        click: function () {
                            resetAddEditMembDialog();
                        }
                    },
                    {
                        text: 'Add',
                        click: function () {
                            saveAddEditMembDialog('Add');
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ],
                open: function () {
                    $(this).parent().find('.ui-dialog-buttonset').css({ 'width': '100%', 'text-align': 'right' })
                    $(this).parent().find('button:contains("Reset")').css({ 'float': 'left', 'margin-left': '22px' });
                }
            });
        }

        function setupMembDialogForEdit() {
            $('#ged-content-surveyor-body-dialog-addEditMemb').dialog({
                title: 'Edit Member',
                buttons: [
                    {
                        text: 'Delete',
                        click: function () {
                            $('.ged-content-surveyor-body-dialog-deleteConfirmation').dialog('open');
                        }
                    },
                    {
                        text: 'Save',
                        click: function () {
                            saveAddEditMembDialog('Edit');
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ],
                open: function () {
                    $(this).parent().find('.ui-dialog-buttonset').css({ 'width': '100%', 'text-align': 'right' })
                    $(this).parent().find('button:contains("Delete")').css({ 'float': 'left', 'margin-left': '22px' });
                }
            });
        }

        function setupAlrmDialogForAdd() {
            resetAddEditAlrmDialog();
            $('#ged-content-reminder-body-dialog-addEditAlrm').dialog({
                title: 'Add Alarm',
                buttons: [
                    {
                        text: 'Reset',
                        click: function () {
                            resetAddEditAlrmDialog();
                        }
                    },
                    {
                        text: 'Add',
                        click: function () {
                            saveAddEditAlrmDialog('Add');
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ],
                open: function () {
                    $(this).parent().find('.ui-dialog-buttonset').css({ 'width': '100%', 'text-align': 'right' })
                    $(this).parent().find('button:contains("Reset")').css({ 'float': 'left', 'margin-left': '22px' });
                }
            });
        }

        function setupAlrmDialogForEdit() {
            $('#ged-content-reminder-body-dialog-addEditAlrm').dialog({
                title: 'Edit Alarm',
                buttons: [
                    {
                        text: 'Delete',
                        click: function () {
                            $('.ged-content-reminder-body-dialog-deleteConfirmation').dialog('open');
                        }
                    },
                    {
                        text: 'Save',
                        click: function () {
                            saveAddEditAlrmDialog('Edit');
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ],
                open: function () {
                    $(this).parent().find('.ui-dialog-buttonset').css({ 'width': '100%', 'text-align': 'right' })
                    $(this).parent().find('button:contains("Delete")').css({ 'float': 'left', 'margin-left': '22px' });
                }
            });
        }

        function resetAddEditRaidDialog() {
            $('#dialog-addEditRaid-name').val('');
            $('#dialog-addEditRaid-repeatCount').val('1');
            $('#dialog-addEditRaid-repeatTarget').val('1');
            $('#dialog-addEditRaid-daily').prop('checked', true);
            $('#dialog-addEditRaid-daily').button({ icons: { primary: 'ui-icon-circle-check' } });
            $('#dialog-addEditRaid-daily').button('refresh');
            $('.dialog-addEditRaid-week').removeProp('checked');
            $('.dialog-addEditRaid-week').button('refresh');
            $('.dialog-addEditRaid-week').button({ disabled: true });
            $('#dialog-addEditRaid-time').removeProp('checked');
            $('#dialog-addEditRaid-time').button({ icons: { primary: 'ui-icon-circle-close' } });
            $('#dialog-addEditRaid-time').button('refresh');
            $('#dialog-addEditRaid-timeStart').val('');
            $('#dialog-addEditRaid-timeStart').prop('disabled', true);
            $('#dialog-addEditRaid-timeEnd').val('');
            $('#dialog-addEditRaid-timeEnd').prop('disabled', true);
            $('#dialog-addEditRaid-cooldown').removeProp('checked');
            $('#dialog-addEditRaid-cooldown').button({ icons: { primary: 'ui-icon-circle-close' } });
            $('#dialog-addEditRaid-cooldown').button('refresh');
            $('#dialog-addEditRaid-cooldownDuration').val('1');
            $('#dialog-addEditRaid-cooldownDuration').prop('disabled', true);
            $('#dialog-addEditRaid-duration').removeProp('checked');
            $('#dialog-addEditRaid-duration').button({ icons: { primary: 'ui-icon-circle-close' } });
            $('#dialog-addEditRaid-duration').button('refresh');
            $('#dialog-addEditRaid-durationStart').val('');
            $('#dialog-addEditRaid-durationStart').prop('disabled', true);
            $('#dialog-addEditRaid-durationEnd').val('');
            $('#dialog-addEditRaid-durationEnd').prop('disabled', true);
            $('#dialog-addEditRaid-note').val('');
        }

        function resetAddEditCharDialog() {
            $('#dialog-addEditChar-name').val('');
            $('.dialog-addEditChar-rank').removeProp('checked');
            $('#dialog-addEditChar-rank-que').prop('checked', true);
            $('.dialog-addEditChar-rank').button('refresh');
            $('#dialog-addEditChar-icon').val('');
            $('#dialog-addEditChar-note').val('');
        }

        function resetAddEditItemDialog() {
            $('#dialog-addEditItem-name').val('');
            $('#dialog-addEditItem-price').val('');
            $('#dialog-addEditItem-price-display').text('0');
            $('#dialog-addEditItem-price-display').css('color', 'white');
            $('#dialog-addEditItem-price-display-currency').text(' Vis');
            $('#dialog-addEditItem-price-display-currency').css('color', 'gold');
            $('.dialog-addEditItem-currency').removeProp('checked');
            $('#dialog-addEditItem-currency-vis').prop('checked', true);
            $('.dialog-addEditItem-currency').button('refresh');
            $('.dialog-addEditItem-type').removeProp('checked');
            $('#dialog-addEditItem-type-mis').prop('checked', true);
            $('.dialog-addEditItem-type').button('refresh');
            $('#dialog-addEditItem-note').val('');
        }

        function resetAddEditShopDialog() {
            $('#dialog-addEditShop-name').val($("#dialog-addEditShop-name option:first").val());
            $('#dialog-addEditShop-name').selectmenu('refresh');
            $('#dialog-addEditShop-quantity').val('1');
            $('#dialog-addEditShop-note').val('');
        }

        function resetAddEditProjDialog() {
            $('#dialog-addEditProj-name').val('');
            $('#dialog-addEditProj-color').val('black');
            $('.dialog-addEditProj-type').removeProp('checked');
            $('#dialog-addEditProj-type-mis').prop('checked', true);
            $('.dialog-addEditProj-type').button('refresh');
            $('#dialog-addEditProj-note').val('');
        }

        function resetAddEditMembDialog() {
            $("#dialog-addEditMemb-type").val($("#dialog-addEditMemb-type option:first").val());
            $("#dialog-addEditMemb-type").selectmenu('refresh');
            $('#dialog-addEditMemb-level').val('100');
            $('#dialog-addEditMemb-note').val('');
        }

        function resetAddEditAlrmDialog() {
            $('#dialog-addEditAlrm-name').val('');
            $('#dialog-addEditAlrm-switch').prop('checked', true);
            $('#dialog-addEditAlrm-switch').button({ icons: { primary: 'ui-icon-circle-check' }, label: 'Enabled' });
            $('#dialog-addEditAlrm-daily').button('refresh');
            $('#dialog-addEditAlrm-daily').prop('checked', true);
            $('#dialog-addEditAlrm-daily').button({ icons: { primary: 'ui-icon-circle-check' } });
            $('#dialog-addEditAlrm-daily').button('refresh');
            $('.dialog-addEditAlrm-week').removeProp('checked');
            $('.dialog-addEditAlrm-week').button('refresh');
            $('.dialog-addEditAlrm-week').button({ disabled: true });
            $('#dialog-addEditAlrm-timeStart').val('00:00');
            $('#dialog-addEditAlrm-timeEnd').val('00:00');
            $('#dialog-addEditAlrm-note').val('');
        }

        function saveAddEditRaidDialog(action) {

            var name, color, status, icon, maxCount, maxTarget, isDaily, dayList, isTimeslot, timeStart, timeEnd, isCooldown, isOnCooldown, cooldownCount, note, currentCount, lastRaidDate, lastTableUpdate, gotDuration, durationStart, durationEnd, isExpired, order;
            
            name = $('#dialog-addEditRaid-name').val();
            color = action == 'Add' ? 'black' : raidList[currentlyEditingRaidListId].Color;
            status = action == 'Add' ? 'new' : raidList[currentlyEditingRaidListId].Status;
            icon = action == 'Add' ? 'bullet' : raidList[currentlyEditingRaidListId].Icon;
            maxCount = parseInt($('#dialog-addEditRaid-repeatCount').val());
            maxCount = maxCount < -1 ? -1 : maxCount;
            maxTarget = parseInt($('#dialog-addEditRaid-repeatTarget').val());

            isDaily = $('#dialog-addEditRaid-daily').prop('checked');
            if (!isDaily) {
                dayList = ($('#dialog-addEditRaid-week-sun').prop('checked') ? '0' : '') + ($('#dialog-addEditRaid-week-mon').prop('checked') ? '1' : '') + ($('#dialog-addEditRaid-week-tue').prop('checked') ? '2' : '') +
                    ($('#dialog-addEditRaid-week-wed').prop('checked') ? '3' : '') + ($('#dialog-addEditRaid-week-thu').prop('checked') ? '4' : '') + ($('#dialog-addEditRaid-week-fri').prop('checked') ? '5' : '') + ($('#dialog-addEditRaid-week-sat').prop('checked') ? '6' : '');
                isDaily = dayList == '';
            }
            else {
                dayList = '';
            }

            isTimeslot = $('#dialog-addEditRaid-time').prop('checked');
            if (isTimeslot) {
                timeStart = $('#dialog-addEditRaid-timeStart').val();
                timeEnd = $('#dialog-addEditRaid-timeEnd').val();
                isTimeslot = (timeStart != '' && timeEnd != '');
                if (isTimeslot) {
                    var timeStartDate = new Date('01/01/2000 ' + formatTimeTo12H(timeStart));
                    var timeEndDate = new Date('01/01/2000 ' + formatTimeTo12H(timeEnd));
                    timeStart = timeStartDate > timeEndDate ? timeEnd : timeStart;
                }
            }
            else {
                timeStart = '';
                timeEnd = '';
            }

            isCooldown = $('#dialog-addEditRaid-cooldown').prop('checked');
            if (isCooldown) {
                isOnCooldown = action == 'Add' ? false : raidList[currentlyEditingRaidListId].IsOnCooldown;
                cooldownCount = parseInt($('#dialog-addEditRaid-cooldownDuration').val());
                isCooldown = cooldownCount > 1;
            }
            else {
                cooldownCount = 1;
            }

            gotDuration = $('#dialog-addEditRaid-duration').prop('checked');
            if (gotDuration) {
                durationStart = $('#dialog-addEditRaid-durationStart').val();
                durationEnd = $('#dialog-addEditRaid-durationEnd').val();
                var startDate = new Date(durationStart);
                var endDate = new Date(durationEnd);
                gotDuration = (startDate != 'Invalid Date') && (endDate != 'Invalid Date');
                if (gotDuration) {
                    durationStart = startDate > endDate ? durationEnd : durationStart;
                }
            }
            else {
                durationStart = '';
                durationEnd = '';
            }

            note = $('#dialog-addEditRaid-note').val();
            currentCount =  action == 'Add' ? 0 : raidList[currentlyEditingRaidListId].CurrentCount;
            lastRaidDate = action == 'Add' ? '01/01/2000' : raidList[currentlyEditingRaidListId].LastRaidDate;
            lastTableUpdate = action == 'Add' ? '01/01/2000' : raidList[currentlyEditingRaidListId].LastTableUpdate;
            isExpired = action == 'Add' ? false : raidList[currentlyEditingRaidListId].IsExpired;
            order = action == 'Add' ? 0 : raidList[currentlyEditingRaidListId].Order;

            var raid = new Raid(name, color, status, icon, maxCount, maxTarget, isDaily, dayList, isTimeslot, timeStart, timeEnd, isCooldown, isOnCooldown, cooldownCount, note, currentCount, lastRaidDate, lastTableUpdate, gotDuration, durationStart, durationEnd, isExpired, order);

            if (action == 'Add') {
                raidList.push(raid);
            }
            else {
                raidList[currentlyEditingRaidListId] = raid;
            }

            storeRaidTableData();

            if (globalOption.IsAutoReloadTable) {
                reloadRaidTable();
                displayMessage('info', action == 'Add' ? 'New raid ' + name + ' added.' : 'Raid ' + name + ' updated.');
            }
            else {
                displayMessage('alert', (action == 'Add' ? 'New raid ' + name + ' added.' : 'Raid ' + name + ' updated.') + ' Auto Update Tables is turned off. Refresh/Sort the table manually to reflect the changes.');
            }
        }

        function saveAddEditCharDialog(action) {

            var name, color, rank, isCollected, icon, note, order;

            name = $('#dialog-addEditChar-name').val();
            color = action == 'Add' ? 'black' : charList[currentlyEditingCharListId].Color;
            rank = $('.dialog-addEditChar-rank:checked').val();
            isCollected = action == 'Add' ? false : charList[currentlyEditingCharListId].IsCollected;
            icon = $('#dialog-addEditChar-icon').val();
            note = $('#dialog-addEditChar-note').val();
            order = action == 'Add' ? 0 : charList[currentlyEditingCharListId].Order;

            var char = new Char(name, color, rank, isCollected, icon, note, order);

            if (action == 'Add') {
                charList.push(char);
            }
            else {
                charList[currentlyEditingCharListId] = char;
            }

            storeCharTableData();

            if (globalOption.IsAutoReloadTable) {
                reloadCharTable();
                displayMessage('info', action == 'Add' ? 'New character ' + name + ' added.' : 'Character ' + name + ' updated.');
            }
            else {
                displayMessage('alert', (action == 'Add' ? 'New character ' + name + ' added.' : 'Character ' + name + ' updated.') + ' Auto Update Tables is turned off. Refresh/Sort the table manually to reflect the changes.');
            }
        }

        function saveAddEditItemDialog(action) {

            var name, color, type, price, currency, dateAdded, note, order;

            name = $('#dialog-addEditItem-name').val();
            color = action == 'Add' ? 'black' : itemList[currentlyEditingItemListId].Color;
            var strPrice = $('#dialog-addEditItem-price').cleanVal() == '' ? '0' : $('#dialog-addEditItem-price').cleanVal();
            price = parseInt(strPrice);
            type = $('.dialog-addEditItem-type:checked').val();
            currency = $('.dialog-addEditItem-currency:checked').val();
            var currentDate = new Date();
            dateAdded = $.format.date(currentDate.toString(), "MM/dd/yyyy");
            note = $('#dialog-addEditItem-note').val();
            order = action == 'Add' ? 0 : itemList[currentlyEditingItemListId].Order;
            
            var item = new Item(name, color, type, price, currency, dateAdded, note, order);

            if (action == 'Add') {
                itemList.push(item);
            }
            else {
                itemList[currentlyEditingItemListId] = item;
            }

            storeItemTableData();

            if (globalOption.IsAutoReloadTable) {
                reloadItemTable();
                displayMessage('info', action == 'Add' ? 'New item ' + name + ' added.' : 'Item ' + name + ' updated.');
            }
            else {
                displayMessage('alert', (action == 'Add' ? 'New item ' + name + ' added.' : 'Item ' + name + ' updated.') + ' Auto Update Tables is turned off. Refresh/Sort the table manually to reflect the changes.');
            }
        }

        function saveAddEditShopDialog(action) {

            var name, quantity, price, color, note, order;
            var priceList;

            name = $('#dialog-addEditShop-name').val();
            quantity = parseInt($('#dialog-addEditShop-quantity').val());
            quantity = quantity ? quantity : 0;
            priceList = $.grep(itemList, function (e) { return e.Name == name; });
            price = priceList.length > 0 ? priceList[0].Price : 0;
            price = quantity * price;
            color = getItemColor(price);
            note = $('#dialog-addEditShop-note').val();
            order = action == 'Add' ? shopList.length : shopList[currentlyEditingShopListId].Order;

            var shop = new Shop(name, quantity, price, color, note, order);

            if (action == 'Add') {
                shopList.push(shop);
            }
            else {
                shopList[currentlyEditingShopListId] = shop;
            }

            storeShopTableData();

            if (globalOption.IsAutoReloadTable) {
                reloadShopTable();
                displayMessage('info', action == 'Add' ? 'New item ' + name + ' added.' : 'Item ' + name + ' updated.');
            }
            else {
                displayMessage('alert', (action == 'Add' ? 'New item ' + name + ' added.' : 'Item ' + name + ' updated.') + ' Auto Update Tables is turned off. Refresh/Sort the table manually to reflect the changes.');
            }
        }

        function saveAddEditProjDialog(action) {

            var name, color, type, note, order;

            name = $('#dialog-addEditProj-name').val();
            color = $('#dialog-addEditProj-color').val();
            type = $('.dialog-addEditProj-type:checked').val();
            note = $('#dialog-addEditProj-note').val();
            order = action == 'Add' ? projList.length : projList[currentlyEditingProjListId].Order;

            var proj = new Proj(name, color, type, note, order);

            if (action == 'Add') {
                projList.push(proj);
            }
            else {
                projList[currentlyEditingProjListId] = proj;
            }

            storeProjTableData();

            if (globalOption.IsAutoReloadTable) {
                reloadProjTable();
                displayMessage('info', action == 'Add' ? 'New item ' + name + ' added.' : 'Item ' + name + ' updated.');
            }
            else {
                displayMessage('alert', (action == 'Add' ? 'New item ' + name + ' added.' : 'Item ' + name + ' updated.') + ' Auto Update Tables is turned off. Refresh/Sort the table manually to reflect the changes.');
            }
        }

        function saveAddEditMembDialog(action) {

            var type, level, point, note, order;

            type = $('#dialog-addEditMemb-type').val();
            level = parseInt($('#dialog-addEditMemb-level').val());
            point = action == 'Add' ? 0 : membList[currentlyEditingMembListId].Point;
            note = $('#dialog-addEditMemb-note').val();
            order = action == 'Add' ? membList.length : membList[currentlyEditingMembListId].Order;

            if (level < 1 || level > 150) {
                level = 1;
            }

            var memb = new Memb(type, level, point, note, order);

            if (action == 'Add') {
                membList.push(memb);
            }
            else {
                membList[currentlyEditingMembListId] = memb;
            }

            storeMembTableData();

            if (globalOption.IsAutoReloadTable) {
                reloadMembTable();
                displayMessage('info', action == 'Add' ? 'New member ' + type + ' Level ' + level + ' added.' : 'Member ' + type + ' updated.');
            }
            else {
                displayMessage('alert', (action == 'Add' ? 'New member ' + type + ' Level ' + level + ' added.' : 'Member ' + type + ' updated.') + ' Auto Update Tables is turned off. Refresh/Sort the table manually to reflect the changes.');
            }
        }

        function saveAddEditAlrmDialog(action) {
            var name, color, isDaily, dayList, timeStart, timeEnd, lastAlarmDate, note, isOn;

            name = $('#dialog-addEditAlrm-name').val();
            color = action == 'Add' ? 'black' : alrmList[currentlyEditingAlrmListId].Color;

            isDaily = $('#dialog-addEditAlrm-daily').prop('checked');
            if (!isDaily) {
                dayList = ($('#dialog-addEditAlrm-week-sun').prop('checked') ? '0' : '') + ($('#dialog-addEditAlrm-week-mon').prop('checked') ? '1' : '') + ($('#dialog-addEditAlrm-week-tue').prop('checked') ? '2' : '') +
                    ($('#dialog-addEditAlrm-week-wed').prop('checked') ? '3' : '') + ($('#dialog-addEditAlrm-week-thu').prop('checked') ? '4' : '') + ($('#dialog-addEditAlrm-week-fri').prop('checked') ? '5' : '') + ($('#dialog-addEditAlrm-week-sat').prop('checked') ? '6' : '');
                isDaily = dayList == '';
            }
            else {
                dayList = '';
            }

            timeStart = $('#dialog-addEditAlrm-timeStart').val();
            timeEnd = $('#dialog-addEditAlrm-timeEnd').val();
            isTimeslot = (timeStart != '' && timeEnd != '');
            if (isTimeslot) {
                var timeStartDate = new Date('01/01/2000 ' + formatTimeTo12H(timeStart));
                var timeEndDate = new Date('01/01/2000 ' + formatTimeTo12H(timeEnd));
                timeStart = timeStartDate > timeEndDate ? timeEnd : timeStart;
            }

            lastAlarmDate = action == 'Add' ? '01/01/2000' : alrmList[currentlyEditingAlrmListId].LastAlarmDate;
            note = $('#dialog-addEditAlrm-note').val();
            isOn = $('#dialog-addEditAlrm-switch').prop('checked');

            var alrm = new Alrm(name, color, isDaily, dayList, timeStart, timeEnd, lastAlarmDate, note, isOn);

            if (action == 'Add') {
                alrmList.push(alrm);
            }
            else {
                alrmList[currentlyEditingAlrmListId] = alrm;
            }

            storeAlrmTableData();

            if (globalOption.IsAutoReloadTable) {
                reloadAlrmTable();
                displayMessage('info', action == 'Add' ? 'New alarm ' + name + ' added.' : 'Alarm ' + name + ' updated.');
            }
            else {
                displayMessage('alert', (action == 'Add' ? 'New alarm ' + name + ' added.' : 'Alarm ' + name + ' updated.') + ' Auto Update Tables is turned off. Refresh/Sort the table manually to reflect the changes.');
            }
        }

        function deleteCurrentlyEditingRaid() {
            var name = raidList[currentlyEditingRaidListId].Name;

            if (raidList.length > 0 && currentlyEditingRaidListId >= 0) {
                raidList.splice(currentlyEditingRaidListId, 1);
            }

            storeRaidTableData();
            reloadRaidTable();

            displayMessage('info', 'Raid ' + name + ' deleted.');
        }

        function deleteCurrentlyEditingChar() {
            var name = charList[currentlyEditingCharListId].Name;

            if (charList.length > 0 && currentlyEditingCharListId >= 0) {
                charList.splice(currentlyEditingCharListId, 1);
            }

            storeCharTableData();
            reloadCharTable();

            displayMessage('info', 'Character ' + name + ' deleted.');
        }

        function deleteCurrentlyEditingItem() {
            var name = itemList[currentlyEditingItemListId].Name;

            if (itemList.length > 0 && currentlyEditingItemListId >= 0) {
                itemList.splice(currentlyEditingItemListId, 1);
            }

            storeItemTableData();
            reloadItemTable();

            displayMessage('info', 'Item ' + name + ' deleted.');
        }

        function deleteCurrentlyEditingShop() {
            var shop = shopList[currentlyEditingShopListId];
            var name = shop.Name;

            for (var ctr = 0; ctr < shopList.length; ctr++) {
                if (shopList[ctr].Order > shop.Order) {
                    shopList[ctr].Order -= 1;
                }
            }

            shopList[currentlyEditingShopListId].Order = shopList.length - 1;

            if (shopList.length > 0 && currentlyEditingShopListId >= 0) {
                shopList.splice(currentlyEditingShopListId, 1);
            }

            storeShopTableData();
            reloadShopTable();

            displayMessage('info', 'Item ' + name + ' deleted.');
        }

        function deleteCurrentlyEditingProj() {
            var proj = projList[currentlyEditingProjListId];
            var name = proj.Name;

            for (var ctr = 0; ctr < projList.length; ctr++) {
                if (projList[ctr].Order > proj.Order) {
                    projList[ctr].Order -= 1;
                }
            }

            projList[currentlyEditingProjListId].Order = projList.length - 1;

            if (projList.length > 0 && currentlyEditingProjListId >= 0) {
                projList.splice(currentlyEditingProjListId, 1);
            }

            storeProjTableData();
            reloadProjTable();

            displayMessage('info', 'Project ' + name + ' deleted.');
        }

        function deleteCurrentlyEditingMemb() {
            var name = membList[currentlyEditingMembListId].Type;
            var level = membList[currentlyEditingMembListId].Level;

            for (var ctr = 0; ctr < membList.length; ctr++) {
                if (membList[ctr].Order > membList[currentlyEditingMembListId].Order) {
                    membList[ctr].Order -= 1;
                }
            }

            membList[currentlyEditingMembListId].Order = membList.length - 1;

            if (membList.length > 0 && currentlyEditingMembListId >= 0) {
                membList.splice(currentlyEditingMembListId, 1);
            }

            storeMembTableData();
            reloadMembTable();

            displayMessage('info', name + ' Level ' + level + ' is deleted.');
        }

        function deleteCurrentlyEditingAlrm() {
            var name = alrmList[currentlyEditingAlrmListId].Name;

            if (alrmList.length > 0 && currentlyEditingAlrmListId >= 0) {
                alrmList.splice(currentlyEditingAlrmListId, 1);
            }

            storeAlrmTableData();
            reloadAlrmTable();

            displayMessage('info', 'Alarm ' + name + ' deleted.');
        }

        // Page Functions
        function reloadRaidTable() {

            var html = '<tbody id="ged-content-raider-body-table-row">';

            if (raidList.length > 0) {

                var currentDate = new Date();
                var currentDateString = $.format.date(currentDate.toString(), "MM/dd/yyyy");

                var oldDateString;
                var totalCurrentCount = 0;
                var totalTargetCount = 0;
                for (var ctr = 0; ctr < raidList.length; ctr++) {
                    oldDateString = raidList[ctr].LastTableUpdate;
                    if (getDateGap(oldDateString, currentDateString) != 0) {
                        raidList[ctr].CurrentCount = 0;
                        raidList[ctr].LastTableUpdate = currentDateString;
                    }
                    raidList[ctr].IsOnCooldown = isRaidOnCooldown(raidList[ctr].IsDaily, raidList[ctr].DayList, raidList[ctr].IsTimeslot, raidList[ctr].TimeStart, raidList[ctr].TimeEnd, raidList[ctr].IsCooldown, raidList[ctr].CooldownCount, raidList[ctr].GotDuration, raidList[ctr].DurationStart, raidList[ctr].DurationEnd, raidList[ctr].LastRaidDate);
                    if (raidList[ctr].GotDuration) {
                        raidList[ctr].IsExpired = isRaidExpired(raidList[ctr].DurationEnd, currentDateString);
                    }
                    raidList[ctr].Color = getRaidColor(raidList[ctr].CurrentCount, raidList[ctr].MaxTarget, raidList[ctr].IsOnCooldown, raidList[ctr].IsExpired);
                    raidList[ctr].Status = getRaidStatus(raidList[ctr].CurrentCount, raidList[ctr].MaxTarget, raidList[ctr].IsOnCooldown, raidList[ctr].IsExpired);
                    raidList[ctr].Icon = getRaidIcon(raidList[ctr].CurrentCount, raidList[ctr].MaxTarget, raidList[ctr].IsOnCooldown, raidList[ctr].IsExpired);
                    raidList[ctr].Order = getRaidOrder(raidList[ctr].Status);
                    if (!raidList[ctr].IsOnCooldown) {
                        totalCurrentCount += ((raidList[ctr].CurrentCount > raidList[ctr].MaxTarget && raidList[ctr].MaxTarget > -1) ? raidList[ctr].MaxTarget : raidList[ctr].CurrentCount);
                        totalTargetCount += (raidList[ctr].MaxTarget > 0 ? raidList[ctr].MaxTarget : 0);
                    }
                }

                progressBarValueRaid = totalCurrentCount;
                progressBarTotalRaid = totalTargetCount;

                updateProgressBar(progressBarValueRaid, progressBarTotalRaid, 'raider', false);

                raidList.sort(compareName);
                raidList.sort(compareOrder);

                for (var ctr = 0; ctr < raidList.length; ctr++) {
                    if (raidList[ctr].Order <= globalOption.MissionVision) {
                        html += '<tr class="ged-content-raider-body-table-row">';
                        html += '<td id="ged-content-raider-body-table-cell1-' + ctr + '" style="font-size:0.8em; color:' + raidList[ctr].Color + '; font-weight:bold;">';
                        html += '<div id="ged-icon-div-raid-' + ctr + '" class="ui-icon ui-icon-' + raidList[ctr].Icon + ' ged-icon-div" style="vertical-align:middle;"></div>&nbsp;';
                        html += '<div style="line-height:16px; vertical-align:middle; display:inline-block; text-overflow:ellipsis; width:360px; overflow:hidden; white-space:nowrap;" title="' + raidList[ctr].Name + '">' + raidList[ctr].Name + '</div>';
                        html += '</td>';
                        html += '<td id="ged-content-raider-body-table-cell2-' + ctr + '" style="text-align:center; font-size:0.8em;">';
                        html += raidList[ctr].CurrentCount + '/' + (raidList[ctr].MaxTarget == -1 ? '0' : raidList[ctr].MaxTarget);
                        html += '</td>';
                        html += '<td id="ged-content-raider-body-table-cell3-' + ctr + '" style="text-align:center; font-size:0.8em;">';
                        html += raidList[ctr].Status;
                        html += '</td>';
                        html += '<td style="text-align:center;">';
                        if (!raidList[ctr].IsOnCooldown && (
                            (raidList[ctr].MaxTarget > -1 && raidList[ctr].CurrentCount < raidList[ctr].MaxTarget) ||
                            (raidList[ctr].MaxTarget > -1 && raidList[ctr].MaxCount < 0) ||
                            (raidList[ctr].MaxTarget > -1 && raidList[ctr].CurrentCount < raidList[ctr].MaxCount && raidList[ctr].MaxCount > 0))) {
                            html += '<button id="ged-button-missionDone-' + ctr + '" class="ged-button ged-hover ged-button-missionDone ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" raidlistid="' + ctr + '" title="Mission Complete" role="button"><span class="ui-button-text">Mission Complete</span></button>&#13;&#10;';
                            html += '<button id="ged-button-missionFail-' + ctr + '" class="ged-button ged-hover ged-button-missionFail ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" raidlistid="' + ctr + '" title="Skip" role="button"><span class="ui-button-text">Skip</span></button>';
                        }
                        else {
                            html += '<button id="ged-button-missionDone-' + ctr + '" class="ged-button ged-hover ged-button-missionDone ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" raidlistid="' + ctr + '" style="display:none;" title="Mission Complete" role="button"><span class="ui-button-text">Mission Complete</span></button>&#13;&#10;';
                            html += '<button id="ged-button-missionFail-' + ctr + '" class="ged-button ged-hover ged-button-missionFail ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" raidlistid="' + ctr + '" style="display:none;" title="Skip" role="button"><span class="ui-button-text">Skip</span></button>';
                        }
                        html += '</td>';
                        html += '<td style="text-align:center;">';
                        html += '<button id="ged-iconbutton-decrementRaid-' + ctr + '" class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-decrementRaid' + (raidList[ctr].CurrentCount > 0 ? '"' : ' ui-state-disabled" disabled="true"') + ' title="Decrement" raidlistid="' + ctr + '"><div class="ui-icon ui-icon-circle-minus ged-icon-div"></div></button>&#13;&#10;';
                        html += '<button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-editRaid" title="Edit" raidlistid="' + ctr + '"><div class="ui-icon ui-icon-gear ged-icon-div"></div></button>&#13;&#10;';
                        html += '<div class="ged-content-raider-tooltip"><button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-infoRaid" title="' + trimToLength(raidList[ctr].Note, 90) + '" raidlistid="' + ctr + '"><div class="ui-icon ui-icon-info ged-icon-div"></div></button></div>';
                        html += '</td>';
                        html += '</tr>';
                    }
                }
            }

            html += '</tbody>';

            $('#ged-content-raider-body-table-row').remove();
            $('#ged-content-raider-body-table').append(html);
            
            if (raidList.length > 0) {
                $('.ged-content-raider-tooltip').tooltip();
            }
        }

        function reloadCharTable() {

            var html = '<tbody id="ged-content-collector-body-table-row">';

            if (charList.length > 0) {

                var totalCurrentCount = 0;
                var totalMaxCharCount = 0;

                for (var ctr = 0; ctr < charList.length; ctr++) {
                    charList[ctr].Color = getCharColor(charList[ctr].Rank, charList[ctr].IsCollected);
                    charList[ctr].Order = getCharOrder(charList[ctr].Rank);
                    if(charList[ctr].IsCollected)
                    {
                        totalCurrentCount += 1;
                    }
                    totalMaxCharCount += 1;
                }

                progressBarValueChar = totalCurrentCount;
                progressBarTotalChar = totalMaxCharCount;

                updateProgressBar(progressBarValueChar, progressBarTotalChar, 'collector', false);

                charList.sort(compareName);
                charList.sort(compareOrder);
                charList.sort(compareIsCollected);

                for (var ctr = 0; ctr < charList.length; ctr++) {
                    html += '<tr class="ged-content-collector-body-table-row">';
                    html += '<td style="text-align:center;"><img src="' + charList[ctr].Icon + '" style="width:54px; height:54px;" /></td>';
                    html += '<td id="ged-content-collector-body-table-cell1-' + ctr + '" ' + (charList[ctr].IsCollected ? ' style="font-weight:bold;"' : '') + '>';
                    html += charList[ctr].Name;
                    html += '</td>';
                    html += '<td id="ged-content-collector-body-table-cell2-' + ctr + '" style="text-align:center; color:' + charList[ctr].Color + ';' + (charList[ctr].IsCollected ? ' font-weight:bold;' : '') + '">';
                    html += charList[ctr].Rank;
                    html += '</td>';
                    html += '<td style="text-align:center;">';
                    if (charList[ctr].IsCollected) {
                        html += '<input id="ged-checkbox-recruit-' + ctr + '" class="ged-checkbox-recruit ui-helper-hidden-accessible" charlistid="' + ctr + '" checked="checked" type="checkbox">';
                        html += '<label aria-pressed="true" role="button" class="ged-checkbox-recruitLabel ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary ui-state-active" for="ged-checkbox-recruit-' + ctr + '" title="Character Recruited">';
                        html += '<span class="ui-button-icon-primary ui-icon ui-icon-circle-check"></span>';
                        html += '<span class="ui-button-text">Recruited</span>';
                        html += '</label>';
                    }
                    else {
                        html += '<input id="ged-checkbox-recruit-' + ctr + '" class="ged-checkbox-recruit ui-helper-hidden-accessible" charlistid="' + ctr + '" type="checkbox">';
                        html += '<label role="button" class="ged-checkbox-recruitLabel ged-hover ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" for="ged-checkbox-recruit-' + ctr + '" title="Character Recruited">';
                        html += '<span class="ui-button-icon-primary ui-icon ui-icon-circle-close"></span>';
                        html += '<span class="ui-button-text">Recruit</span>';
                        html += '</label>';
                    }
                    html += '</td>';                    
                    html += '<td style="text-align:center;">';
                    html += '<button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-editChar" title="Edit" charlistid="' + ctr + '"><div class="ui-icon ui-icon-gear ged-icon-div"></div></button>&#13;&#10;';
                    html += '<div class="ged-content-collector-tooltip"><button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-infoChar" title="' + trimToLength(charList[ctr].Note, 90) + '" charlistid="' + ctr + '"><div class="ui-icon ui-icon-info ged-icon-div"></div></button></div>';
                    html += '</td>';
                    html += '</tr>';
                }
            }

            html += '</tbody>';

            $('#ged-content-collector-body-table-row').remove();
            $('#ged-content-collector-body-table').append(html);

            if (charList.length > 0) {
                $('.ged-content-collector-tooltip').tooltip();
            }
        }

        function reloadItemTable() {

            var html = '<tbody id="ged-content-trader-body-table-row-item">';

            if (itemList.length > 0) {

                for (var ctr = 0; ctr < itemList.length; ctr++) {
                    itemList[ctr].Color = getItemColor(itemList[ctr].Price);
                    itemList[ctr].Order = getItemOrder(itemList[ctr].Type);
                }

                itemList.sort(comparePrice);
                itemList.sort(compareOrder);
                itemList.sort(compareCurrency);

                for (var ctr = 0; ctr < itemList.length; ctr++) {
                    html += '<tr class="ged-content-trader-body-table-row-item">';
                    html += '<td style="font-weight:bold;">';
                    html += itemList[ctr].Name;
                    html += '</td>';
                    html += '<td style="text-align:center;">';
                    html += getItemDate(itemList[ctr].DateAdded);
                    html += '</td>';
                    html += '<td style="text-align:center;">';
                    html += itemList[ctr].Type;
                    html += '</td>';
                    html += '<td style="text-align:right; font-weight:bold;">';
                    html += '<span style="color:' + itemList[ctr].Color + ';">' + commaSeparateNumber(itemList[ctr].Price) + '</span><span style="color:' + (itemList[ctr].Currency == 'Vis' ? 'gold' : 'lime') + ';"> ' + itemList[ctr].Currency + '</span>';
                    html += '</td>';
                    html += '<td style="text-align:center;">';
                    html += '<button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-editItem" title="Edit" itemlistid="' + ctr + '"><div class="ui-icon ui-icon-gear ged-icon-div"></div></button>&#13;&#10;';
                    html += '<div class="ged-content-trader-tooltipItem"><button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-infoItem" title="' + trimToLength(itemList[ctr].Note, 90) + '" itemlistid="' + ctr + '"><div class="ui-icon ui-icon-info ged-icon-div"></div></button></div>';
                    html += '</td>';
                    html += '</tr>';
                }
            }

            html += '</tbody>';

            $('#ged-content-trader-body-table-row-item').remove();
            $('#ged-content-trader-body-table-item').append(html);

            if (itemList.length > 0) {
                $('.ged-content-trader-tooltipItem').tooltip();
            }
        }

        function reloadShopTable() {

            var html = '<tbody id="ged-content-trader-body-table-row-shop">';

            if (shopList.length > 0) {

                shopList.sort(compareOrder);

                for (var ctr = 0; ctr < shopList.length; ctr++) {
                    html += '<tr class="ged-content-trader-body-table-row-shop">';
                    html += '<td style="font-weight:bold;">';
                    html += shopList[ctr].Name;
                    html += '</td>';
                    html += '<td style="text-align:right; font-weight:bold;">';
                    html += '<span style="color:' + shopList[ctr].Color + ';">' + commaSeparateNumber(shopList[ctr].Price) + '</span><span style="color:gold;"> Vis</span>';
                    html += '</td>';
                    html += '<td style="text-align:center;">';
                    html += '<button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-topShop' + (shopList[ctr].Order == 0 ? ' ui-state-disabled" disabled="true"' : '"') + ' title="Move Top" shoplistid="' + ctr + '"><div class="ui-icon ui-icon-arrowthickstop-1-n ged-icon-div"></div></button>&#13;&#10;';
                    html += '<button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-upShop' + (shopList[ctr].Order == 0 ? ' ui-state-disabled" disabled="true"' : '"') + ' title="Move Up" shoplistid="' + ctr + '"><div class="ui-icon ui-icon-arrowthick-1-n ged-icon-div"></div></button>&#13;&#10;';
                    html += '<button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-downShop' + (shopList[ctr].Order == (shopList.length - 1) ? ' ui-state-disabled" disabled="true"' : '"') + ' title="Move Down" shoplistid="' + ctr + '"><div class="ui-icon ui-icon-arrowthick-1-s ged-icon-div"></div></button>&#13;&#10;';
                    html += '<button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-bottomShop' + (shopList[ctr].Order == (shopList.length - 1) ? ' ui-state-disabled" disabled="true"' : '"') + ' title="Move Bottom" shoplistid="' + ctr + '"><div class="ui-icon ui-icon-arrowthickstop-1-s ged-icon-div"></div></button>&#13;&#10;';
                    html += '<button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-editShop" title="Edit" shoplistid="' + ctr + '"><div class="ui-icon ui-icon-gear ged-icon-div"></div></button>&#13;&#10;';
                    html += '<div class="ged-content-trader-tooltipShop"><button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-infoShop" title="' + trimToLength(shopList[ctr].Note, 90) + '" shoplistid="' + ctr + '"><div class="ui-icon ui-icon-info ged-icon-div"></div></button></div>';
                    html += '</td>';
                    html += '</tr>';
                }
            }

            html += '</tbody>';

            $('#ged-content-trader-body-table-row-shop').remove();
            $('#ged-content-trader-body-table-shop').append(html);

            if (shopList.length > 0) {
                $('.ged-content-trader-tooltipShop').tooltip();
            }
        }

        function reloadProjTable() {

            var html = '<tbody id="ged-content-trader-body-table-row-proj">';

            if (projList.length > 0) {

                projList.sort(compareOrder);

                for (var ctr = 0; ctr < projList.length; ctr++) {
                    html += '<tr class="ged-content-trader-body-table-row-proj">';
                    html += '<td style="font-weight:bold; color:' + projList[ctr].Color + ';">';
                    html += projList[ctr].Name;
                    html += '</td>';
                    html += '<td style="text-align:center;">';
                    html += projList[ctr].Type;
                    html += '</td>';
                    html += '<td style="text-align:center;">';
                    html += '<button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-topProj' + (projList[ctr].Order == 0 ? ' ui-state-disabled" disabled="true"' : '"') + ' title="Move Top" projlistid="' + ctr + '"><div class="ui-icon ui-icon-arrowthickstop-1-n ged-icon-div"></div></button>&#13;&#10;';
                    html += '<button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-upProj' + (projList[ctr].Order == 0 ? ' ui-state-disabled" disabled="true"' : '"') + ' title="Move Up" projlistid="' + ctr + '"><div class="ui-icon ui-icon-arrowthick-1-n ged-icon-div"></div></button>&#13;&#10;';
                    html += '<button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-downProj' + (projList[ctr].Order == (projList.length - 1) ? ' ui-state-disabled" disabled="true"' : '"') + ' title="Move Down" projlistid="' + ctr + '"><div class="ui-icon ui-icon-arrowthick-1-s ged-icon-div"></div></button>&#13;&#10;';
                    html += '<button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-bottomProj' + (projList[ctr].Order == (projList.length - 1) ? ' ui-state-disabled" disabled="true"' : '"') + ' title="Move Bottom" projlistid="' + ctr + '"><div class="ui-icon ui-icon-arrowthickstop-1-s ged-icon-div"></div></button>&#13;&#10;';
                    html += '<button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-editProj" title="Edit" projlistid="' + ctr + '"><div class="ui-icon ui-icon-gear ged-icon-div"></div></button>&#13;&#10;';
                    html += '<div class="ged-content-trader-tooltipProj"><button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-infoProj" title="' + trimToLength(projList[ctr].Note, 90) + '" projlistid="' + ctr + '"><div class="ui-icon ui-icon-info ged-icon-div"></div></button></div>';
                    html += '</td>';
                    html += '</tr>';
                }
            }

            html += '</tbody>';

            $('#ged-content-trader-body-table-row-proj').remove();
            $('#ged-content-trader-body-table-proj').append(html);
            
            if (projList.length > 0) {
                $('.ged-content-trader-tooltipProj').tooltip();
            }
        }

        function reloadMembTable() {

            var html = '';
            var innerMax = 0;
            var ctr = 0;

            if (membList.length > 0) {

                membList.sort(compareOrder);

                for (var octr = 0; octr < Math.ceil(membList.length / 9) ; octr++) {

                    html += '<fieldset class="ged-surveyor-barracks ged-surveyor-barracks-' + (octr + 1) + '" barracksId="' + (octr + 1) + '"><legend>Barrack ' + (octr + 1) + '</legend>';
                        
                    innerMax = (membList.length - (octr * 9)) >= 9 ? 9 : (membList.length - (octr * 9));

                    for (var ictr = 0; ictr < innerMax; ictr++) {

                        html += '<div class="ged-surveyor-member ged-surveyor-member-' + (octr + 1) + '-' + (ictr + 1) + '" barracksId="' + (octr + 1) + '" orderId="' + membList[ctr].Order + '">';
                        html += '<div class="ged-content-surveyor-detail">';
                        html += '<div class="ged-content-surveyor-membe-image"><img src="' + getMembIcon(membList[ctr].Type) + '" style="width:36px; height:36px;" /></div>';
                        html += '<div class="ged-content-surveyor-member-name" title="' + membList[ctr].Type + '">' + membList[ctr].Type + '</div>';
                        html += '<div class="ged-content-surveyor-member-level" style="' + getMembStyle(membList[ctr].Level) + '">Level ' + membList[ctr].Level + '</div>';
                        html += '</div>';
                        html += '<div class="ged-content-surveyor-control-container">';
                        html += '<div class="ged-content-surveyor-control">';
                        html += '<button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-levelDownMemb' + (membList[ctr].Level == 1 ? ' ui-state-disabled" disabled="true"' : '"') + ' title="Level Down" memblistid="' + ctr + '"><div class="ui-icon ui-icon-minus ged-icon-div"></div></button>&#13;&#10;';
                        html += '<button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-levelUpMemb' + (membList[ctr].Level == 140 ? ' ui-state-disabled" disabled="true"' : '"') + ' title="Level Up" memblistid="' + ctr + '"><div class="ui-icon ui-icon-plus ged-icon-div"></div></button>&#13;&#10;';
                        html += '<button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-editMemb" title="Edit" memblistid="' + ctr + '"><div class="ui-icon ui-icon-gear ged-icon-div"></div></button>&#13;&#10;';
                        html += '<div class="ged-content-surveyor-tooltip"><button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-infoMemb" title="' + trimToLength(membList[ctr].Note, 90) + '" memblistid="' + ctr + '"><div class="ui-icon ui-icon-info ged-icon-div"></div></button></div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';

                        ctr++;
                    }
                        
                    html += '</fieldset>';

                }
            }

            $('#ged-content-surveyor-holder').empty();
            $('#ged-content-surveyor-holder').append(html);
            
            $('.ged-surveyor-barracks').sortable({
                connectWith: '.ged-surveyor-barracks',
                placeholder: 'member-placeholder',
                items: 'div.ged-surveyor-member',
                scroll: false,
                helper: 'clone',
                tolerance: 'pointer',
                stop: function (event, ui) {
                    var oldBarrackId = ui.item.attr('barracksId');
                    var newBarrackId = ui.item.parent().attr('barracksId');
                    ui.item.attr('barracksId', newBarrackId);
                    ui.item.addClass('ged-surveyor-transfer');
                    if (oldBarrackId != newBarrackId) {
                        if (ui.item.parent().children('div').length > 9) {
                            var swapElement = ui.item.parent().children('div:not(.ged-surveyor-transfer)').last();
                            if (oldBarrackId > newBarrackId) {
                                swapElement.prependTo($('.ged-surveyor-barracks-' + oldBarrackId));
                            }
                            else {
                                swapElement.appendTo($('.ged-surveyor-barracks-' + oldBarrackId));
                            }
                            swapElement.attr('barracksId', oldBarrackId);
                        }
                        if (!$('.ged-surveyor-barracks-' + oldBarrackId).is(':last-child') && $('.ged-surveyor-barracks-' + oldBarrackId).children('div').length < 9) {
                            var swapElement = ui.item.parent().children('div:not(.ged-surveyor-transfer)').first();
                            if (oldBarrackId > newBarrackId) {
                                swapElement.prependTo($('.ged-surveyor-barracks-' + oldBarrackId));
                            }
                            else {
                                swapElement.appendTo($('.ged-surveyor-barracks-' + oldBarrackId));
                            }
                            swapElement.attr('barracksId', oldBarrackId);
                        }
                    }
                    ui.item.removeClass('ged-surveyor-transfer');

                    var ctr = 0;
                    $(".ged-surveyor-member").each(function () {
                        membList[$(this).attr('orderId')].Order = ctr;
                        ctr++;
                    });
                    storeMembTableData();
                }
            });


            if (membList.length > 0) {
                $('.ged-content-surveyor-tooltip').tooltip();
            }

            updateFamilyPointSystem(false);
        }

        function reloadAlrmTable() {

            var html = '<tbody id="ged-content-reminder-body-table-row">';

            if (alrmList.length > 0) {

                clearTimeout(alarmInProgress);

                checkerPerMinute = function () {
                    for (var ctr = 0; ctr < alrmList.length; ctr++) {
                        $('#ged-content-reminder-body-table-cell3-' + ctr).text(getCountdownDisplay(ctr, false));
                    }

                    alarmInProgress = setTimeout(checkerPerMinute, 60000);
                }

                alarmInProgress = checkerPerMinute();

                alrmList.sort(compareName);

                for (var ctr = 0; ctr < alrmList.length; ctr++) {
                    html += '<tr class="ged-content-reminder-body-table-row">';
                    html += '<td id="ged-content-reminder-body-table-cell1-' + ctr + '" style="font-size:0.8em; font-weight:bold;">';
                    html += '<div class="ui-icon ui-icon-clock ged-icon-div" style="vertical-align:middle;"></div>&nbsp;';
                    html += '<div style="line-height:16px; vertical-align:middle; display:inline-block; text-overflow:ellipsis; width:120px; overflow:hidden; white-space:nowrap;" title="' + alrmList[ctr].Name + '">' + alrmList[ctr].Name + '</div>';
                    html += '</td>';
                    html += '<td id="ged-content-reminder-body-table-cell2-' + ctr + '" style="font-size:0.8em; text-align:center;">';
                    html += getDayListDisplay(alrmList[ctr].DayList) + ' from ' + alrmList[ctr].TimeStart + ' to ' + alrmList[ctr].TimeEnd;
                    html += '</td>';
                    html += '<td id="ged-content-reminder-body-table-cell3-' + ctr + '" style="font-size:0.8em; text-align:center;" >';
                    html += getCountdownDisplay(ctr, true);
                    html += '</td>';
                    html += '<td style="text-align:center;">';
                    html += '<button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-editAlrm" title="Edit" alrmlistid="' + ctr + '"><div class="ui-icon ui-icon-gear ged-icon-div"></div></button>&#13;&#10;';
                    html += '<div class="ged-content-reminder-tooltip"><button class="ui-state-default ui-corner-all ged-icon ged-hover ged-iconbutton-infoAlrm" title="' + trimToLength(alrmList[ctr].Note, 90) + '" alrmlistid="' + ctr + '"><div class="ui-icon ui-icon-info ged-icon-div"></div></button></div>';
                    html += '</td>';
                    html += '</tr>';
                }
            }

            html += '</tbody>';

            $('#ged-content-reminder-body-table-row').remove();
            $('#ged-content-reminder-body-table').append(html);

            if (alrmList.length > 0) {
                $('.ged-content-reminder-tooltip').tooltip();
            }
        }

        function reloadMemoTable() {
            $('#ged-content-memoir-text').val(memoList);
            $('#ged-content-memoir-text').height($('#ged-content-memoir-text').css('min-height'));
            $('#ged-content-memoir-text').height($('#ged-content-memoir-text').prop('scrollHeight'));
        }

        function updateProgressBar(totalCurrentCount, totalTargetCount, selector, displayProgress) {
            var progressRate = 0;

            if (totalCurrentCount > 0 && totalTargetCount > 0) {
                progressRate = Math.floor((totalCurrentCount / totalTargetCount) * 100);
            }

            $('.ged-content-' + selector + '-body-progressbar').progressbar({
                value: progressRate
            });

            var oldValue = $('.ged-content-' + selector + '-body-progressbar-label').html();
            var newValue = progressRate + '%';

            if (displayProgress && (oldValue != newValue) && (newValue != '0%')) {
                displayMessage('info', 'Progress Rate: ' + newValue);
            }

            $('.ged-content-' + selector + '-body-progressbar-label').html(newValue);
        }

        function displayMessage(type, message, duration) {
            duration = typeof duration !== 'undefined' ? duration : (type == 'info' ? 6000 : 600000);
            var state = '';
            if (type == 'info') {
                state = 'ui-state-highlight';
            }
            else {
                state = 'ui-state-error';
            }
            
            var html = '';
            html += '<div class="' + state + ' ui-corner-all" style="padding: 0 0.7em; height: 38px; line-height: 1.4; font-size: 11px;">';
            html += '<p>';
            html += '<span class="ui-icon ui-icon-' + type + '" style="float: left; margin-right: .3em;  vertical-align: text-top;"></span>';
            html += '<span style="display:inline-block; vertical-align: text-top;">' + message + '</span>';
            html += '<a id="ged-message-btn-close" style="display:inline-block; width:30px; vertical-align: text-top;">';
            html += '<span class="ui-icon ui-icon-close ged-message-hover" style=" float: right; margin-right: .6em; margin-left: .9em;"></span>';
            html += '</a>';
            html += '</p>';
            html += '</div>';
            $('#ged-message').html(html);

            clearTimeout(messageInProgress);

            $('#ged-message').stop(true, true);

            $('#ged-message').show();

            messageInProgress = setTimeout(function () {
                $('#ged-message').fadeOut(4000, function () {
                });
            }, duration);

            $('#ged-message-btn-close').click(function () {
                $('#ged-message').stop(true, true);
                $('#ged-message').fadeOut(300, function () {
                });
            });
        }

        // Raid Table Functions
        function missionDoneOrFail(raidListId, result) {

            if (!raidList[raidListId].IsOnCooldown && (
                (raidList[raidListId].MaxTarget > -1 && raidList[raidListId].CurrentCount < raidList[raidListId].MaxTarget) ||
                (raidList[raidListId].MaxTarget > -1 && raidList[raidListId].MaxCount < 0) ||
                (raidList[raidListId].MaxTarget > -1 && raidList[raidListId].CurrentCount < raidList[raidListId].MaxCount && raidList[raidListId].MaxCount > 0))) {

                var currentDate = new Date();
                var currentDateString = $.format.date(currentDate.toString(), "MM/dd/yyyy");
                var oldDateString = raidList[raidListId].LastTableUpdate;

                if (getDateGap(oldDateString, currentDateString) != 0) {

                    raidList[raidListId].LastTableUpdate = currentDateString;
                    raidList[raidListId].CurrentCount = 1;

                    displayMessage('info', 'Raid table data is not up to date. Progress bar will be inaccurate. Click the Refresh button to fix the data.');
                }
                else {

                    raidList[raidListId].CurrentCount += 1;

                    if (raidList[raidListId].CurrentCount <= raidList[raidListId].MaxTarget) {
                        progressBarValueRaid += 1;
                        updateProgressBar(progressBarValueRaid, progressBarTotalRaid, 'raider', true);
                    }
                }

                oldDateString = raidList[raidListId].LastRaidDate;
                if (getDateGap(oldDateString, currentDateString) != 0 && result == 'Done') {
                    raidList[raidListId].LastRaidDate = currentDateString;
                }

                raidList[raidListId].Color = getRaidColor(raidList[raidListId].CurrentCount, raidList[raidListId].MaxTarget, raidList[raidListId].IsOnCooldown, raidList[raidListId].IsExpired);
                raidList[raidListId].Status = getRaidStatus(raidList[raidListId].CurrentCount, raidList[raidListId].MaxTarget, raidList[raidListId].IsOnCooldown, raidList[raidListId].IsExpired);
                raidList[raidListId].Icon = getRaidIcon(raidList[raidListId].CurrentCount, raidList[raidListId].MaxTarget, raidList[raidListId].IsOnCooldown, raidList[raidListId].IsExpired);
                raidList[raidListId].Order = getRaidOrder(raidList[raidListId].Status);

                raidList[raidListId].IsOnCooldown = isRaidOnCooldown(raidList[raidListId].IsDaily, raidList[raidListId].DayList, raidList[raidListId].IsTimeslot, raidList[raidListId].TimeStart, raidList[raidListId].TimeEnd, raidList[raidListId].IsCooldown, raidList[raidListId].CooldownCount, raidList[raidListId].GotDuration, raidList[raidListId].DurationStart, raidList[raidListId].DurationEnd, raidList[raidListId].LastRaidDate);
                if (raidList[raidListId].GotDuration) {
                    raidList[raidListId].IsExpired = isRaidExpired(raidList[raidListId].DurationEnd, currentDateString);
                }

                updateRaidTableRow(raidListId);
            }
        }

        function missionDecrement(raidListId) {

            var currentDate = new Date();
            var currentDateString = $.format.date(currentDate.toString(), "MM/dd/yyyy");
            var oldDateString = raidList[raidListId].LastTableUpdate;

            if (getDateGap(oldDateString, currentDateString) != 0) {

                raidList[raidListId].CurrentCount = 0;

                displayMessage('info', 'Raid table data is not up to date. Progress bar will be inaccurate. Click the Refresh button to fix the data.');
            }
            else {

                if (raidList[raidListId].CurrentCount > 0) {
                    raidList[raidListId].CurrentCount -= 1;
                }

                if (progressBarValueRaid > 0 && raidList[raidListId].CurrentCount < raidList[raidListId].MaxTarget) {
                    progressBarValueRaid -= 1;
                    updateProgressBar(progressBarValueRaid, progressBarTotalRaid, 'raider', true);
                }
            }

            raidList[raidListId].Color = getRaidColor(raidList[raidListId].CurrentCount, raidList[raidListId].MaxTarget, raidList[raidListId].IsOnCooldown, raidList[raidListId].IsExpired);
            raidList[raidListId].Status = getRaidStatus(raidList[raidListId].CurrentCount, raidList[raidListId].MaxTarget, raidList[raidListId].IsOnCooldown, raidList[raidListId].IsExpired);
            raidList[raidListId].Icon = getRaidIcon(raidList[raidListId].CurrentCount, raidList[raidListId].MaxTarget, raidList[raidListId].IsOnCooldown, raidList[raidListId].IsExpired);
            raidList[raidListId].Order = getRaidOrder(raidList[raidListId].Status);

            raidList[raidListId].IsOnCooldown = isRaidOnCooldown(raidList[raidListId].IsDaily, raidList[raidListId].DayList, raidList[raidListId].IsTimeslot, raidList[raidListId].TimeStart, raidList[raidListId].TimeEnd, raidList[raidListId].IsCooldown, raidList[raidListId].CooldownCount, raidList[raidListId].GotDuration, raidList[raidListId].DurationStart, raidList[raidListId].DurationEnd, raidList[raidListId].LastRaidDate);
            if (raidList[raidListId].GotDuration) {
                raidList[raidListId].IsExpired = isRaidExpired(raidList[raidListId].DurationEnd, currentDateString);
            }

            updateRaidTableRow(raidListId);
        }

        function updateRaidTableRow(raidListId) {

            var stringRaidListId = raidListId.toString();

            $('#ged-icon-div-raid-' + stringRaidListId).removeClass('ui-icon-trash');
            $('#ged-icon-div-raid-' + stringRaidListId).removeClass('ui-icon-clock');
            $('#ged-icon-div-raid-' + stringRaidListId).removeClass('ui-icon-minus');
            $('#ged-icon-div-raid-' + stringRaidListId).removeClass('ui-icon-notice');
            $('#ged-icon-div-raid-' + stringRaidListId).removeClass('ui-icon-plus');
            $('#ged-icon-div-raid-' + stringRaidListId).removeClass('ui-icon-check');
            $('#ged-icon-div-raid-' + stringRaidListId).addClass('ui-icon-' + raidList[raidListId].Icon);

            $('#ged-content-raider-body-table-cell1-' + stringRaidListId).css({ 'color': raidList[raidListId].Color });
            $('#ged-content-raider-body-table-cell2-' + stringRaidListId).html(raidList[raidListId].CurrentCount + '/' + raidList[raidListId].MaxTarget);
            $('#ged-content-raider-body-table-cell3-' + stringRaidListId).html(raidList[raidListId].Status);

            
            if (!raidList[raidListId].IsOnCooldown && (
                (raidList[raidListId].MaxTarget > -1 && raidList[raidListId].CurrentCount < raidList[raidListId].MaxTarget) ||
                (raidList[raidListId].MaxTarget > -1 && raidList[raidListId].MaxCount < 0) ||
                (raidList[raidListId].MaxTarget > -1 && raidList[raidListId].CurrentCount < raidList[raidListId].MaxCount && raidList[raidListId].MaxCount > 0))) {
                $('#ged-button-missionDone-' + stringRaidListId).css({ 'display': 'inline-block' });
                $('#ged-button-missionFail-' + stringRaidListId).css({ 'display': 'inline-block' });
            }
            else {
                $('#ged-button-missionDone-' + stringRaidListId).css({ 'display': 'none' });
                $('#ged-button-missionFail-' + stringRaidListId).css({ 'display': 'none' });
            }

            if (raidList[raidListId].CurrentCount > 0) {
                $('#ged-iconbutton-decrementRaid-' + stringRaidListId).removeClass('ui-state-disabled');
                $('#ged-iconbutton-decrementRaid-' + stringRaidListId).prop('disabled', false);
            }
            else {
                $('#ged-iconbutton-decrementRaid-' + stringRaidListId).addClass('ui-state-disabled');
                $('#ged-iconbutton-decrementRaid-' + stringRaidListId).removeClass('ui-state-hover');
                $('#ged-iconbutton-decrementRaid-' + stringRaidListId).prop('disabled', true);
            }

            storeRaidTableData();
        }

        function getRaidColor(currentCount, maxTarget, isOnCooldown, isExpired) {
            if (maxTarget < 0 || isOnCooldown || isExpired || (maxTarget == 0 && currentCount == 0))
                return 'dimgray';
            if (maxTarget == 0 && currentCount > 0)
                return 'darkslategray';
            if (currentCount == 0)
                return 'darkred';
            if (currentCount < maxTarget)
                return 'gold';
            if (currentCount == maxTarget)
                return 'darkgreen';
            if (currentCount > maxTarget)
                return 'darkblue';
            return 'black';
        }

        function getRaidIcon(currentCount, maxTarget, isOnCooldown, isExpired) {
            if (isExpired)
                return 'trash';
            if (maxTarget <= 0)
                return 'minus';
            if (isOnCooldown)
                return 'clock';
            if (currentCount == 0)
                return 'notice';
            if (currentCount < maxTarget)
                return 'plus';
            if (currentCount >= maxTarget)
                return 'check';
            return 'minus';
        }

        function getRaidStatus(currentCount, maxTarget, isOnCooldown, isExpired) {
            if (isExpired)
                return 'Expired';
            if (maxTarget < 0)
                return 'Ignored';
            if (isOnCooldown)
                return 'Cooldown';
            if (maxTarget == 0 && currentCount == 0)
                return 'Feasible';
            if (maxTarget == 0 && currentCount > 0)
                return 'Extraneous';
            if (currentCount == 0)
                return 'Pending';
            if (currentCount < maxTarget)
                return 'Ongoing';
            if (currentCount == maxTarget)
                return 'Done';
            if (currentCount > maxTarget)
                return 'Exceed';
            return 'Error';
        }

        function getRaidOrder(status) {
            if (status == 'Ongoing')
                return 1;
            if (status == 'Pending')
                return 2;
            if (status == 'Exceed')
                return 3;
            if (status == 'Extraneous')
                return 4;
            if (status == 'Done')
                return 5;
            if (status == 'Feasible')
                return 6;
            if (status == 'Cooldown')
                return 7;
            if (status == 'Ignored')
                return 8;
            if (status == 'Expired')
                return 9;
            return 0;
        }

        function isRaidOnCooldown(isDaily, dayList, isTimeslot, timeStart, timeEnd, isCooldown, cooldownCount, gotDuration, durationStart, durationEnd, lastRaidDate) {
            var onCooldown = false;
            var currentDateString = $.format.date((new Date()).toString(), 'MM/dd/yyyy');
            var currentDate = new Date(currentDateString);

            if (!isDaily) {
                var currentDay = ((new Date()).getDay()).toString();
                if (dayList.indexOf(currentDay) == -1) {
                    onCooldown = true;
                }
            }

            if (isTimeslot) {
                var currentTimeString = $.format.date((new Date()).toString(), 'h:mm a');
                var currentTimeDate = new Date('01/01/2000 ' + currentTimeString);
                var timeStartDate = new Date('01/01/2000 ' + formatTimeTo12H(timeStart));
                var timeEndDate = new Date('01/01/2000 ' + formatTimeTo12H(timeEnd));
                if (currentTimeDate < timeStartDate || currentTimeDate > timeEndDate) {
                    onCooldown = true;
                }
            }

            if (isCooldown) {
                var nextRaidDate = addDays(lastRaidDate, cooldownCount);
                var nextRaidDateString = $.format.date(nextRaidDate.toString(), 'MM/dd/yyyy');
                nextRaidDate = new Date(nextRaidDateString);
                var lastDate = new Date(lastRaidDate);
                if (currentDate < nextRaidDate && currentDate.valueOf() != lastDate.valueOf()) {
                    onCooldown = true;
                }
            }

            if (gotDuration) {
                var durationStartDate = new Date(durationStart);
                var durationEndDate = new Date(durationEnd);
                if (currentDate < durationStartDate || currentDate > durationEndDate) {
                    onCooldown = true;
                }
            }

            return onCooldown;
        }

        function isRaidExpired(durationEnd, currentDate) {
            var to = new Date(durationEnd);
            var check = new Date(currentDate);

            return check > to;
        }

        // Char Table Functions
        function updateCharTableRow(charListId) {

            var stringCharListId = charListId.toString();

            charList[charListId].IsCollected = $('#ged-checkbox-recruit-' + stringCharListId).prop('checked');

            if (charList[charListId].IsCollected) {
                $('#ged-checkbox-recruit-' + stringCharListId).button({ label: 'Recruited', icons: { primary: 'ui-icon-circle-check' } });
                $('#ged-content-collector-body-table-cell1-' + stringCharListId).css({ 'font-weight': 'bold' });
                $('#ged-content-collector-body-table-cell2-' + stringCharListId).css({ 'font-weight': 'bold', 'color': getCharColor(charList[charListId].Rank, charList[charListId].IsCollected) });

                progressBarValueChar += 1;
                updateProgressBar(progressBarValueChar, progressBarTotalChar, 'collector', true);
            }
            else {
                $('#ged-checkbox-recruit-' + stringCharListId).button({ label: 'Recruit', icons: { primary: 'ui-icon-circle-close' } });
                $('#ged-content-collector-body-table-cell1-' + stringCharListId).css({ 'font-weight': 'normal' });
                $('#ged-content-collector-body-table-cell2-' + stringCharListId).css({ 'font-weight': 'normal', 'color': 'darkgray' });

                progressBarValueChar -= 1;
                updateProgressBar(progressBarValueChar, progressBarTotalChar, 'collector', true);
            }

            storeCharTableData();
        }

        function getCharColor(rank, isCollected) {
            if (!isCollected)
                return 'darkgray';
            if (rank == 'Pioneer')
                return 'darkgreen';
            if (rank == 'Quest')
                return 'gold';
            if (rank == 'Premium')
                return 'darkorange';
            if (rank == 'Promotional')
                return 'darkviolet';
            return 'black';
        }

        function getCharOrder(rank) {
            if (rank == 'Pioneer')
                return 1;
            if (rank == 'Quest')
                return 2;
            if (rank == 'Premium')
                return 3;
            if (rank == 'Promotional')
                return 4;
            return 0;
        }

        // Item Table Functions
        function getItemColor(price) {
            var priceLength = price.toString().length;
            if (priceLength == 1)
                return 'white';
            if (priceLength == 2)
                return 'hotpink';
            if (priceLength == 3)
                return 'darkblue';
            if (priceLength == 4)
                return 'lime';
            if (priceLength == 5)
                return 'yellow';
            if (priceLength == 6)
                return 'saddlebrown';
            if (priceLength == 7)
                return 'aquamarine';
            if (priceLength == 8)
                return 'darkviolet';
            if (priceLength == 9)
                return 'darkorange';
            if (priceLength == 10)
                return 'firebrick';
            return 'darkgreen';
        }

        function getItemOrder(type) {
            if (type == 'Equip')
                return 1;
            if (type == 'Expend')
                return 2;
            if (type == 'Misc')
                return 3;
            if (type == 'Costume')
                return 4;
            return 0;
        }

        function getItemDate(dateAdded) {
            var currentDate = new Date();
            var currentDateString = $.format.date(currentDate.toString(), "MM/dd/yyyy");
            var dayGap = getDateGap(dateAdded, currentDateString);
            if (dayGap == 0)
                return 'Today';
            if (dayGap == 1)
                return 'Yesterday';
            return dayGap + ' days ago'
        }

        // Memb Table Functions
        function getMembIcon(name) {
            for (var ctr = 0; ctr < charList.length; ctr++) {
                if (charList[ctr].Name == name) {
                    return charList[ctr].Icon;
                }
            }
            return "";
        }

        function getMembStyle(level) {
            if (level > 0 && level < 100) {
                return "color:firebrick;";
            }
            else if (level > 99 && level < 110) {
                return "color:darkorange;";
            }
            else if (level > 109 && level < 120) {
                return "color:darkgreen;";
            }
            else if (level > 119 && level < 130) {
                return "color:darkblue;";
            }
            else if (level > 129 && level < 140) {
                return "color:darkviolet;";
            }
            else {
                return "color:black;font-weight:bold;";
            }
        }

        function updateFamilyPointSystem(displayProgress) {
            var familyPoint = [0, 1220, 2860, 5232, 8360, 12259, 16945, 22430, 28725, 35838, 43780, 52557, 62177, 72647, 83973, 96161, 109217, 123146, 137953, 153642, 170219, 187688, 206052, 225316, 245483, 266558, 288544, 311444, 335261, 360000, 381251, 416431, 453622, 492875, 534238, 577759, 623486, 671466, 721748, 774377, 829402, 886868, 946821, 1009309, 1074377, 1142069, 1212433, 1285513, 1361353, 1440000, 1650000, 1870000, 2100000, 2340000, 2590000, 2850000, 3120000, 3400000, 3690000, 3990000, 4300000, 4620000, 4950000, 5290000, 5640000, 6000000, 6370000, 6750000, 7140000, 7540000, 7960000, 8400000, 8860000, 9340000, 9840000, 10360000, 10900000, 11460000, 12040000, 12640000, 13270000, 13930000, 14620000, 15340000, 16090000, 16870000, 17680000, 18520000, 19390000, 20290000, 21230000, 22210000, 23230000, 24290000, 25390000, 26530000, 27710000, 28930000, 30190000];
            var memberPoint = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400, 441, 484, 529, 576, 625, 676, 729, 784, 841, 900, 961, 1024, 1089, 1156, 1225, 1296, 1369, 1444, 1521, 1600, 1681, 1764, 1849, 1936, 2025, 2116, 2209, 2304, 2401, 2500, 2601, 2704, 2809, 2916, 3025, 3136, 3249, 3364, 3481, 3600, 3721, 3844, 3969, 4096, 4225, 4356, 4489, 4624, 4761, 4900, 5041, 5184, 5329, 5476, 5625, 5776, 5929, 6084, 6241, 6400, 6561, 6724, 6889, 7056, 7225, 7396, 7569, 7744, 7921, 8100, 8281, 8464, 8649, 8836, 9025, 9216, 9409, 9604, 9801, 10000, 10701, 11404, 12109, 12816, 13525, 14236, 14949, 15664, 16381, 17100, 18321, 19544, 20769, 21996, 23225, 24456, 25689, 26924, 28161, 29400, 31141, 32884, 34629, 36376, 38125, 39876, 41629, 43384, 45141, 46900, 49161, 51424, 53689, 55956, 58225, 60496, 62769, 65044, 67321, 69600, 72381, 75164, 77949, 80736, 83525, 86316, 89109, 91904, 94701, 97500];
            var currentPoint = 0, familyLevel, highestNo;

            for (var ctr = 0; ctr < membList.length; ctr++) {
                membList[ctr].Point = memberPoint[membList[ctr].Level - 1];

                highestNo = ctr;
                for (var tmp = 0; tmp < membList.length; tmp++) {
                    if (membList[ctr].Type == membList[tmp].Type) {
                        if (membList[tmp].Level >= membList[highestNo].Level) {
                            highestNo = tmp;
                        }
                    }
                }

                if (highestNo == ctr) {
                    membList[ctr].Point = Math.floor(membList[ctr].Point * 1.2);
                }
                currentPoint += membList[ctr].Point;
            }

            for (var ctr = 0; ctr < familyPoint.length - 1; ctr++) {
                if (currentPoint >= familyPoint[ctr] && currentPoint < familyPoint[ctr + 1]) {
                    familyLevel = ctr + 1;
                    break;
                }
            }
            
            updateProgressBar((currentPoint - familyPoint[familyLevel - 1]), (familyPoint[familyLevel] - familyPoint[familyLevel - 1]), 'surveyor', displayProgress);

            var oldValue = $('div.ged-content-surveyor-body-title').html();
            var newValue = 'Family Level ' + familyLevel;

            $('div.ged-content-surveyor-body-title').html(newValue);

            if ((oldValue != newValue) && (oldValue != 'Family Level 0')) {
                displayMessage('info', 'Family Level became ' + newValue + '.');
            }

            storeMembTableData();
        }

        // Alrm Table Functions
        function getDayListDisplay(dayList) {
            var display = '';
            var dayCtr = 0;
            if(dayList == '')
            {
                display = 'Everyday';
            }
            else {
                display = 'Every ';
                for (var ctr = 0; ctr < dayList.length; ctr++) {
                    if (dayCtr > 0) {
                        display += ', ';
                    }
                    switch (dayList[ctr]) {
                        case '0':
                            display += 'Sunday';
                            dayCtr++;
                            break;
                        case '1':
                            display += 'Monday';
                            dayCtr++;
                            break;
                        case '2':
                            display += 'Tuesday';
                            dayCtr++;
                            break;
                        case '3':
                            display += 'Wednesday';
                            dayCtr++;
                            break;
                        case '4':
                            display += 'Thursday';
                            dayCtr++;
                            break;
                        case '5':
                            display += 'Friday';
                            dayCtr++;
                            break;
                        case '6':
                            display += 'Saturday';
                            dayCtr++;
                            break;
                    }
                }
            }
            display = display.replace(/,(?=[^,]*$)/, ' and');
            return display;
        }

        function getCountdownDisplay(alrmCtr, isSnooze) {

            if (!alrmList[alrmCtr].IsOn) {
                return 'Disabled';
            }

            var currentDate = new Date();
            var currentDayString = currentDate.getDay().toString();

            if (!alrmList[alrmCtr].IsDaily) {
                if (alrmList[alrmCtr].DayList.indexOf(currentDayString) == -1) {
                    return 'On Cooldown';
                }
            }
            
            var currentDateString = $.format.date(currentDate.toString(), 'MM/dd/yyyy');
            var currentMinutes = (currentDate.getHours() * 60) + currentDate.getMinutes();
            var startMinutes = (parseInt(alrmList[alrmCtr].TimeStart.split(':')[0]) * 60) + parseInt(alrmList[alrmCtr].TimeStart.split(':')[1]);
            var endMinutes = (parseInt(alrmList[alrmCtr].TimeEnd.split(':')[0]) * 60) + parseInt(alrmList[alrmCtr].TimeEnd.split(':')[1]);

            if (currentMinutes < startMinutes) {
                var minuteGap = startMinutes - currentMinutes;
                var hourDisplay, minuteDisplay;

                if (minuteGap > 59) {
                    hourDisplay = Math.floor(minuteGap / 60);
                    minuteDisplay = minuteGap % 60;
                    return hourDisplay.toString() + (hourDisplay > 1 ? ' hours ' : ' hour ') + minuteDisplay.toString() + (minuteDisplay > 1 ? ' minutes ' : ' minute ') + 'remaining'
                }
                else if (minuteGap > 1) {
                    return (minuteGap).toString() + ' minutes remaining';
                }
                else {
                    return (minuteGap).toString() + ' minute remaining';
                }
            }
            else if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {

                if (getDateGap(alrmList[alrmCtr].LastAlarmDate, currentDateString) != 0) {
                    if (isSnooze) {
                        alrmList[alrmCtr].LastAlarmDate = currentDateString;
                        alarmAudio.pause();
                    }
                    else {
                        alarmAudio.currentTime = 0;
                        alarmAudio.play();
                        displayMessage('info', 'Alarm ' + alrmList[alrmCtr].Name + ' is currently ringing. <a onClick="snoozeLink()">Snooze</a>', 56000);
                        return 'Ongoing';
                    }
                }

                return 'Snoozed';
            }
            else {
                return 'On Cooldown';
            }
        }

        function snoozeLink() {
            reloadAlrmTable();
            displayMessage('info', 'Silence invoked.');
        }

        // Objects
        function Raid(name, color, status, icon, maxCount, maxTarget, isDaily, dayList, isTimeslot, timeStart, timeEnd, isCooldown, isOnCooldown, cooldownCount, note, currentCount, lastRaidDate, lastTableUpdate, gotDuration, durationStart, durationEnd, isExpired, order) {
            this.Name = name;
            this.Color = color;
            this.Status = status;
            this.Icon = icon;
            this.MaxCount = maxCount;
            this.MaxTarget = maxTarget;
            this.IsDaily = isDaily;
            this.DayList = dayList;
            this.IsTimeslot = isTimeslot;
            this.TimeStart = timeStart;
            this.TimeEnd = timeEnd;
            this.IsCooldown = isCooldown;
            this.IsOnCooldown = isOnCooldown;
            this.CooldownCount = cooldownCount;
            this.Note = note;
            this.CurrentCount = currentCount;
            this.LastRaidDate = lastRaidDate;
            this.LastTableUpdate = lastTableUpdate;
            this.GotDuration = gotDuration;
            this.DurationStart = durationStart;
            this.DurationEnd = durationEnd;
            this.IsExpired = isExpired;
            this.Order = order;
        }

        function Char(name, color, rank, isCollected, icon, note, order) {
            this.Name = name;
            this.Color = color;
            this.Rank = rank;
            this.IsCollected = isCollected;
            this.Icon = icon;
            this.Order = order;
            this.Note = note;
        }

        function Item(name, color, type, price, currency, dateAdded, note, order) {
            this.Name = name;
            this.Color = color;
            this.Type = type;
            this.Price = price;
            this.Currency = currency;
            this.DateAdded = dateAdded;
            this.Note = note;
            this.Order = order;
        }

        function Shop(name, quantity, price, color, note, order) {
            this.Name = name;
            this.Quantity = quantity;
            this.Price = price;
            this.Color = color;
            this.Note = note;
            this.Order = order;
        }

        function Proj(name, color, type, note, order) {
            this.Name = name;
            this.Color = color;
            this.Type = type;
            this.Note = note;
            this.Order = order;
        }

        function Memb(type, level, point, note, order) {
            this.Type = type;
            this.Level = level;
            this.Point = point;
            this.Note = note;
            this.Order = order;
        }

        function Alrm(name, color, isDaily, dayList, timeStart, timeEnd, lastAlarmDate, note, isOn) {
            this.Name = name;
            this.Color = color;
            this.IsDaily = isDaily;
            this.DayList = dayList;
            this.TimeStart = timeStart;
            this.TimeEnd = timeEnd;
            this.LastAlarmDate = lastAlarmDate;
            this.Note = note;
            this.IsOn = isOn;
        }

        function GlobalOption(color, theme, isDeveloperView, gotMargin, isConfirmLeave, isReseedEmpty, isAutoReloadTable, missionVision) {
            this.Color = color;
            this.Theme = theme;
            this.IsDeveloperView = isDeveloperView;
            this.GotMargin = gotMargin;
            this.IsConfirmLeave = isConfirmLeave;
            this.IsReseedEmpty = isReseedEmpty;
            this.IsAutoReloadTable = isAutoReloadTable;
            this.MissionVision = missionVision;
        }

        // Utility Functions
        function compareName(a, b) {
            if (a.Name < b.Name)
                return -1;
            if (a.Name > b.Name)
                return 1;
            return 0;
        }

        function compareOrder(a, b) {
            if (a.Order < b.Order)
                return -1;
            if (a.Order > b.Order)
                return 1;
            return 0;
        }

        function compareIsCollected(a, b) {
            if (!a.IsCollected && b.IsCollected)
                return -1;
            if (a.IsCollected && !b.IsCollected)
                return 1;
            return 0;
        }

        function comparePrice(a, b) {
            if (a.Price > b.Price)
                return -1;
            if (a.Price < b.Price)
                return 1;
            return 0;
        }

        function compareCurrency(a, b) {
            if (a.Currency == 'Vis' && b.Currency == 'Feso')
                return -1;
            if (a.Currency == 'Feso' && b.Currency == 'Vis')
                return 1;
            return 0;
        }

        function getDateGap(oldDateString, newDateString) {
            var oldDate = new Date(oldDateString);
            var newDate = new Date(newDateString);
            return (newDate - oldDate) / (1000 * 60 * 60 * 24);
        }

        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }

        function formatTimeTo12H(time24H) {
            var time12H = time24H.split(':');
            var hour = parseInt(time12H[0]);
            var a = ' AM';
            if (hour > 12) {
                a = ' PM';
                hour -= 12;
            }
            return hour.toString() + ':' + time12H[1] + a;
        }

        function trimToLength(text, size) {
            return (text.length > size)
              ? jQuery.trim(text).substring(0, size).split(" ").slice(0, -1).join(" ") + "..."
              : text;
        }

        function commaSeparateNumber(val) {
            while (/(\d+)(\d{3})/.test(val.toString())) {
                val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
            }
            return val;
        }

        function destroyClickedElement(event) {
            document.body.removeChild(event.target);
        }

        // Storage Functions
        function checkLocalStorageCompatibility() {
            if (Modernizr.localstorage) {
                displayMessage('info', '<strong>Welcome!</strong> This is Granado Espada Daily. Growth, grasp and domination!');
                return true;
            }
            displayMessage('alert', '<strong>Alert:</strong> Your browser doesn\'t support local storage. This page will not work properly.');
            return false;
        }

        function storeRaidTableData() {
            if (isLocalStorageAvailable) {
                localStorage.setItem('GED-RaidList', JSON.stringify(raidList));
            }
            else {
                alert('Local storage is unsupported by your browser.');
            }
        }

        function storeCharTableData() {
            if (isLocalStorageAvailable) {
                localStorage.setItem('GED-CharList', JSON.stringify(charList));
            }
            else {
                alert('Local storage is unsupported by your browser.');
            }
        }

        function storeItemTableData() {
            if (isLocalStorageAvailable) {
                localStorage.setItem('GED-ItemList', JSON.stringify(itemList));
            }
            else {
                alert('Local storage is unsupported by your browser.');
            }
        }

        function storeShopTableData() {
            if (isLocalStorageAvailable) {
                localStorage.setItem('GED-ShopList', JSON.stringify(shopList));
            }
            else {
                alert('Local storage is unsupported by your browser.');
            }
        }

        function storeProjTableData() {
            if (isLocalStorageAvailable) {
                localStorage.setItem('GED-ProjList', JSON.stringify(projList));
            }
            else {
                alert('Local storage is unsupported by your browser.');
            }
        }

        function storeMembTableData() {
            if (isLocalStorageAvailable) {
                localStorage.setItem('GED-MembList', JSON.stringify(membList));
            }
            else {
                alert('Local storage is unsupported by your browser.');
            }
        }

        function storeAlrmTableData() {
            if (isLocalStorageAvailable) {
                localStorage.setItem('GED-AlrmList', JSON.stringify(alrmList));
            }
            else {
                alert('Local storage is unsupported by your browser.');
            }
        }

        function storeMemoTableData() {
            if (isLocalStorageAvailable) {
                localStorage.setItem('GED-MemoList', memoList);
            }
            else {
                alert('Local storage is unsupported by your browser.');
            }
        }

        function storeOptionData() {
            if (isLocalStorageAvailable) {
                localStorage.setItem('GED-GlobalOption', JSON.stringify(globalOption));
            }
            else {
                alert('Local storage is unsupported by your browser.');
            }
        }

        function retrieveRaidTableData() {
            if (isLocalStorageAvailable) {
                var retrievedObject = localStorage.getItem('GED-RaidList');
                if (retrievedObject != null) {
                    raidList = JSON.parse(retrievedObject);
                }
            }
            else {
                alert('Local storage is unsupported by your browser.');
            }
        }

        function retrieveCharTableData() {
            if (isLocalStorageAvailable) {
                var retrievedObject = localStorage.getItem('GED-CharList');
                if (retrievedObject != null) {
                    charList = JSON.parse(retrievedObject);
                }
            }
            else {
                alert('Local storage is unsupported by your browser.');
            }
        }

        function retrieveItemTableData() {
            if (isLocalStorageAvailable) {
                var retrievedObject = localStorage.getItem('GED-ItemList');
                if (retrievedObject != null) {
                    itemList = JSON.parse(retrievedObject);
                }
            }
            else {
                alert('Local storage is unsupported by your browser.');
            }
        }

        function retrieveShopTableData() {
            if (isLocalStorageAvailable) {
                var retrievedObject = localStorage.getItem('GED-ShopList');
                if (retrievedObject != null) {
                    shopList = JSON.parse(retrievedObject);
                }
            }
            else {
                alert('Local storage is unsupported by your browser.');
            }
        }

        function retrieveProjTableData() {
            if (isLocalStorageAvailable) {
                var retrievedObject = localStorage.getItem('GED-ProjList');
                if (retrievedObject != null) {
                    projList = JSON.parse(retrievedObject);
                }
            }
            else {
                alert('Local storage is unsupported by your browser.');
            }
        }

        function retrieveMembTableData() {
            if (isLocalStorageAvailable) {
                var retrievedObject = localStorage.getItem('GED-MembList');
                if (retrievedObject != null) {
                    membList = JSON.parse(retrievedObject);
                }
            }
            else {
                alert('Local storage is unsupported by your browser.');
            }
        }

        function retrieveAlrmTableData() {
            if (isLocalStorageAvailable) {
                var retrievedObject = localStorage.getItem('GED-AlrmList');
                if (retrievedObject != null) {
                    alrmList = JSON.parse(retrievedObject);
                }
            }
            else {
                alert('Local storage is unsupported by your browser.');
            }
        }

        function retrieveMemoTableData() {
            if (isLocalStorageAvailable) {
                var retrievedObject = localStorage.getItem('GED-MemoList');
                if (retrievedObject != null) {
                    memoList = retrievedObject;
                }
            }
            else {
                alert('Local storage is unsupported by your browser.');
            }
        }

        function retrieveOptionData() {
            if (isLocalStorageAvailable) {
                var retrievedObject = localStorage.getItem('GED-GlobalOption');
                if (retrievedObject != null) {
                    globalOption = JSON.parse(retrievedObject);
                }
            }
            else {
                alert('Local storage is unsupported by your browser.');
            }
        }

        function importRaidTableData() {
            var fileToLoad = document.getElementById("ged-content-creator-import-raid-file").files[0];

            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                var textFromFileLoaded = fileLoadedEvent.target.result;
                localStorage.setItem('GED-RaidList', textFromFileLoaded);
                retrieveRaidTableData();
                reloadRaidTable();

            };
            fileReader.readAsText(fileToLoad, "UTF-8");
        }

        function exportRaidTableData() {
            var textToWrite = localStorage.getItem('GED-RaidList');
            var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
            var currentDateString = $.format.date((new Date()).toString(), "yyyy-MM-dd");
            var fileNameToSaveAs = 'vv-raid-' + currentDateString + '.json';

            var downloadLink = document.createElement('a');
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = 'Download File';

            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);

            downloadLink.click();
        }

        function importCharTableData() {
            var fileToLoad = document.getElementById("ged-content-creator-import-char-file").files[0];

            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                var textFromFileLoaded = fileLoadedEvent.target.result;
                localStorage.setItem('GED-CharList', textFromFileLoaded);
                retrieveCharTableData();
                reloadCharTable();

            };
            fileReader.readAsText(fileToLoad, "UTF-8");
        }

        function exportCharTableData() {
            var textToWrite = localStorage.getItem('GED-CharList');
            var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
            var currentDateString = $.format.date((new Date()).toString(), "yyyy-MM-dd");
            var fileNameToSaveAs = 'vv-char-' + currentDateString + '.json';

            var downloadLink = document.createElement('a');
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = 'Download File';

            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);

            downloadLink.click();
        }

        function importItemTableData() {
            var fileToLoad = document.getElementById("ged-content-creator-import-item-file").files[0];

            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                var textFromFileLoaded = fileLoadedEvent.target.result;
                localStorage.setItem('GED-ItemList', textFromFileLoaded);
                retrieveItemTableData();
                reloadItemTable();

            };
            fileReader.readAsText(fileToLoad, "UTF-8");
        }

        function exportItemTableData() {
            var textToWrite = localStorage.getItem('GED-ItemList');
            var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
            var currentDateString = $.format.date((new Date()).toString(), "yyyy-MM-dd");
            var fileNameToSaveAs = 'vv-item-' + currentDateString + '.json';

            var downloadLink = document.createElement('a');
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = 'Download File';

            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);

            downloadLink.click();
        }

        function importShopTableData() {
            var fileToLoad = document.getElementById("ged-content-creator-import-shop-file").files[0];

            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                var textFromFileLoaded = fileLoadedEvent.target.result;
                localStorage.setItem('GED-ShopList', textFromFileLoaded);
                retrieveShopTableData();
                reloadShopTable();

            };
            fileReader.readAsText(fileToLoad, "UTF-8");
        }

        function exportShopTableData() {
            var textToWrite = localStorage.getItem('GED-ShopList');
            var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
            var currentDateString = $.format.date((new Date()).toString(), "yyyy-MM-dd");
            var fileNameToSaveAs = 'vv-shop-' + currentDateString + '.json';

            var downloadLink = document.createElement('a');
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = 'Download File';

            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);

            downloadLink.click();
        }

        function importProjTableData() {
            var fileToLoad = document.getElementById("ged-content-creator-import-proj-file").files[0];

            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                var textFromFileLoaded = fileLoadedEvent.target.result;
                localStorage.setItem('GED-ProjList', textFromFileLoaded);
                retrieveProjTableData();
                reloadProjTable();

            };
            fileReader.readAsText(fileToLoad, "UTF-8");
        }

        function exportProjTableData() {
            var textToWrite = localStorage.getItem('GED-ProjList');
            var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
            var currentDateString = $.format.date((new Date()).toString(), "yyyy-MM-dd");
            var fileNameToSaveAs = 'vv-proj-' + currentDateString + '.json';

            var downloadLink = document.createElement('a');
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = 'Download File';

            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);

            downloadLink.click();
        }

        function importMembTableData() {
            var fileToLoad = document.getElementById("ged-content-creator-import-memb-file").files[0];

            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                var textFromFileLoaded = fileLoadedEvent.target.result;
                localStorage.setItem('GED-MembList', textFromFileLoaded);
                retrieveMembTableData();
                reloadMembTable();

            };
            fileReader.readAsText(fileToLoad, "UTF-8");
        }

        function exportMembTableData() {
            var textToWrite = localStorage.getItem('GED-MembList');
            var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
            var currentDateString = $.format.date((new Date()).toString(), "yyyy-MM-dd");
            var fileNameToSaveAs = 'vv-memb-' + currentDateString + '.json';

            var downloadLink = document.createElement('a');
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = 'Download File';

            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);

            downloadLink.click();
        }

        function importAlrmTableData() {
            var fileToLoad = document.getElementById("ged-content-creator-import-alrm-file").files[0];

            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                var textFromFileLoaded = fileLoadedEvent.target.result;
                localStorage.setItem('GED-AlrmList', textFromFileLoaded);
                retrieveAlrmTableData();
                reloadAlrmTable();

            };
            fileReader.readAsText(fileToLoad, "UTF-8");
        }

        function exportAlrmTableData() {
            var textToWrite = localStorage.getItem('GED-AlrmList');
            var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
            var currentDateString = $.format.date((new Date()).toString(), "yyyy-MM-dd");
            var fileNameToSaveAs = 'vv-alrm-' + currentDateString + '.json';

            var downloadLink = document.createElement('a');
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = 'Download File';

            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);

            downloadLink.click();
        }
    