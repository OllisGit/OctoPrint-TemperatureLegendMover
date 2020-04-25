/*
 * View model for TemperatureLegendMover
 *
 * Author: OllisGit
 * License: AGPLv3
 */
$(function() {
    function TemperaturelegendmoverViewModel(parameters) {

        var PLUGIN_ID = "TemperatureLegendMover";
        var self = this;

        self.loginStateViewModel = parameters[0];
        self.settingsViewModel = parameters[1];
        self.temperatureViewModel = parameters[2];

        self.pluginSettings = null;

        self._updateLegendPosition = function(){
            self.temperatureViewModel.plot.getOptions().legend.position = self.pluginSettings.legendPositionMode();
        }


        ///////////////////////////////////////////////////// START: OctoPrint Hooks
        self.onBeforeBinding = function() {
            // assign current pluginSettings
            self.pluginSettings = self.settingsViewModel.settings.plugins[PLUGIN_ID];

            // resetSettings-Stuff
            new ResetSettingsUtilV2(self.pluginSettings).assignResetSettingsFeature(PLUGIN_ID, function(data){
                // no additional reset function
            });

            self.pluginSettings.legendPositionMode.subscribe(function(newValue){
                self._updateLegendPosition();
            });
        }

        self.onAfterTabChange = function(nextTab, currentTab){
            if (nextTab == "#temp"){
                self._updateLegendPosition();
            }
        }
        ///////////////////////////////////////////////////// END: OctoPrint Hooks
    }

    /* view model class, parameters for constructor, container to bind to
     * Please see http://docs.octoprint.org/en/master/plugins/viewmodels.html#registering-custom-viewmodels for more details
     * and a full list of the available options.
     */
    OCTOPRINT_VIEWMODELS.push({
        construct: TemperaturelegendmoverViewModel,
        // ViewModels your plugin depends on, e.g. loginStateViewModel, settingsViewModel, ...
        dependencies: [
            "loginStateViewModel",
            "settingsViewModel",
            "temperatureViewModel"
        ],
        // Elements to bind to, e.g. #settings_plugin_TemperatureLegendMover, #tab_plugin_TemperatureLegendMover, ...
        elements: [
            document.getElementById("temperatureLegendMover_plugin_settings")
        ]
    });
});
