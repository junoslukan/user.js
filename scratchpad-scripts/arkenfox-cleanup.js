/***
  This will reset the preferences that have been
  - removed from the arkenfox user.js
  - deprecated by Mozilla but listed in the arkenfox user.js in the past

  Last updated: 4-November-2022

  Instructions:
  - [optional] close Firefox and backup your profile
  - [optional] disable your network connection [1]
  - start Firefox
  - load about:config and press Ctrl+Shift+K to open the Web Console for about:config
    - using about:config is important, so the script has the right permissions
  - paste this script
  - if you edited the list of prefs in the script, make sure the last pref does not have a trailing comma
  - hit enter
  - check the Info output to see which prefs were reset
  - restart
     - some prefs require a restart
     - a restart will reapply your user.js
  - [optional] re-enable your network connection
 
  [1] Blocking Firefox from the internet ensures it cannot act on your reset preferences in the
  period before you restart it, such as app and extension auto-updating, or downloading unwanted
  components (GMP etc). It depends on what you're resetting and how long before you restart.

***/

(() => {

  if ('undefined' === typeof(Services)) return alert('about:config needs to be the active tab!');

  const aPREFS = [
    /* DEPRECATED */
    /* 103+ */
    'network.cookie.lifetimePolicy', // 103 [technically removed in 104]
    'security.pki.sha1_enforcement_level', // 103
    /* 92-102 */
    'browser.urlbar.suggest.quicksuggest', // 95
    'dom.securecontext.whitelist_onions', // 97
    'dom.storage.next_gen', // 102
    'network.http.spdy.enabled', // 100
    'network.http.spdy.enabled.deps',
    'network.http.spdy.enabled.http2',
    'network.http.spdy.websockets',
    'layout.css.font-visibility.level', // 94
    'security.ask_for_password', // 102
    'security.csp.enable', // 99
    'security.password_lifetime', // 102
    'security.ssl3.rsa_des_ede3_sha', // 93
    /* 79-91 */
    'browser.cache.offline.storage.enable',
    'browser.download.hide_plugins_without_extensions',
    'browser.library.activity-stream.enabled',
    'browser.search.geoSpecificDefaults',
    'browser.search.geoSpecificDefaults.url',
    'dom.ipc.plugins.flash.subprocess.crashreporter.enabled',
    'dom.ipc.plugins.reportCrashURL',
    'dom.w3c_pointer_events.enabled',
    'intl.charset.fallback.override',
    'network.ftp.enabled',
    'plugin.state.flash',
    'security.mixed_content.block_object_subrequest',
    'security.ssl.errorReporting.automatic',
    'security.ssl.errorReporting.enabled',
    'security.ssl.errorReporting.url',
    /* 69-78 */
    'browser.newtabpage.activity-stream.telemetry.ping.endpoint',
    'browser.tabs.remote.allowLinkedWebInFileUriProcess',
    'browser.urlbar.oneOffSearches',
    'devtools.webide.autoinstallADBExtension',
    'devtools.webide.enabled',
    'dom.indexedDB.enabled',
    'extensions.blocklist.url',
    'geo.wifi.logging.enabled',
    'geo.wifi.uri',
    'gfx.downloadable_fonts.woff2.enabled',
    'media.autoplay.allow-muted',
    'media.autoplay.enabled.user-gestures-needed',
    'offline-apps.allow_by_default',
    'plugins.click_to_play',
    'privacy.userContext.longPressBehavior',
    'toolkit.cosmeticAnimations.enabled',
    'toolkit.telemetry.hybridContent.enabled',
    'webgl.disable-extensions',
    /* 61-68 */
    'app.update.enabled',
    'browser.aboutHomeSnippets.updateUrl',
    'browser.chrome.errorReporter.enabled',
    'browser.chrome.errorReporter.submitUrl',
    'browser.chrome.favicons',
    'browser.ctrlTab.previews',
    'browser.fixup.hide_user_pass',
    'browser.newtabpage.activity-stream.asrouter.userprefs.cfr',
    'browser.newtabpage.activity-stream.disableSnippets',
    'browser.onboarding.enabled',
    'browser.search.countryCode',
    'browser.urlbar.autocomplete.enabled',
    'devtools.webide.adbAddonURL',
    'devtools.webide.autoinstallADBHelper',
    'dom.event.highrestimestamp.enabled',
    'experiments.activeExperiment',
    'experiments.enabled',
    'experiments.manifest.uri',
    'experiments.supported',
    'lightweightThemes.update.enabled',
    'media.autoplay.enabled',
    'network.allow-experiments',
    'network.cookie.lifetime.days',
    'network.jar.block-remote-files',
    'network.jar.open-unsafe-types',
    'plugin.state.java',
    'security.csp.enable_violation_events',
    'security.csp.experimentalEnabled',
    'shield.savant.enabled',
    /* 60 or earlier */
    'browser.bookmarks.showRecentlyBookmarked',
    'browser.casting.enabled',
    'browser.crashReports.unsubmittedCheck.autoSubmit',
    'browser.formautofill.enabled',
    'browser.formfill.saveHttpsForms',
    'browser.fullscreen.animate',
    'browser.history.allowPopState',
    'browser.history.allowPushState',
    'browser.history.allowReplaceState',
    'browser.newtabpage.activity-stream.enabled',
    'browser.newtabpage.directory.ping',
    'browser.newtabpage.directory.source',
    'browser.newtabpage.enhanced',
    'browser.newtabpage.introShown',
    'browser.pocket.api',
    'browser.pocket.enabled',
    'browser.pocket.oAuthConsumerKey',
    'browser.pocket.site',
    'browser.polaris.enabled',
    'browser.safebrowsing.appRepURL',
    'browser.safebrowsing.enabled',
    'browser.safebrowsing.gethashURL',
    'browser.safebrowsing.malware.reportURL',
    'browser.safebrowsing.provider.google.appRepURL',
    'browser.safebrowsing.reportErrorURL',
    'browser.safebrowsing.reportGenericURL',
    'browser.safebrowsing.reportMalwareErrorURL',
    'browser.safebrowsing.reportMalwareMistakeURL',
    'browser.safebrowsing.reportMalwareURL',
    'browser.safebrowsing.reportPhishMistakeURL',
    'browser.safebrowsing.reportURL',
    'browser.safebrowsing.updateURL',
    'browser.search.showOneOffButtons',
    'browser.selfsupport.enabled',
    'browser.selfsupport.url',
    'browser.sessionstore.privacy_level_deferred',
    'browser.tabs.animate',
    'browser.trackingprotection.gethashURL',
    'browser.trackingprotection.updateURL',
    'browser.urlbar.unifiedcomplete',
    'browser.usedOnWindows10.introURL',
    'camera.control.autofocus_moving_callback.enabled',
    'camera.control.face_detection.enabled',
    'datareporting.healthreport.about.reportUrl',
    'datareporting.healthreport.about.reportUrlUnified',
    'datareporting.healthreport.documentServerURI',
    'datareporting.healthreport.service.enabled',
    'datareporting.policy.dataSubmissionEnabled.v2',
    'devtools.webide.autoinstallFxdtAdapters',
    'dom.archivereader.enabled',
    'dom.beforeAfterKeyboardEvent.enabled',
    'dom.disable_image_src_set',
    'dom.disable_window_open_feature.scrollbars',
    'dom.disable_window_status_change',
    'dom.enable_user_timing',
    'dom.flyweb.enabled',
    'dom.idle-observers-api.enabled',
    'dom.keyboardevent.code.enabled',
    'dom.network.enabled',
    'dom.push.udp.wakeupEnabled',
    'dom.telephony.enabled',
    'dom.vr.oculus050.enabled',
    'dom.workers.enabled',
    'dom.workers.sharedWorkers.enabled',
    'extensions.formautofill.experimental',
    'extensions.screenshots.system-disabled',
    'extensions.shield-recipe-client.api_url',
    'extensions.shield-recipe-client.enabled',
    'full-screen-api.approval-required',
    'general.useragent.locale',
    'geo.security.allowinsecure',
    'intl.locale.matchOS',
    'loop.enabled',
    'loop.facebook.appId',
    'loop.facebook.enabled',
    'loop.facebook.fallbackUrl',
    'loop.facebook.shareUrl',
    'loop.feedback.formURL',
    'loop.feedback.manualFormURL',
    'loop.logDomains',
    'loop.server',
    'media.block-play-until-visible',
    'media.eme.apiVisible',
    'media.eme.chromium-api.enabled',
    'media.getusermedia.screensharing.allow_on_old_platforms',
    'media.getusermedia.screensharing.allowed_domains',
    'media.gmp-eme-adobe.autoupdate',
    'media.gmp-eme-adobe.enabled',
    'media.gmp-eme-adobe.visible',
    'network.http.referer.userControlPolicy',
    'network.http.sendSecureXSiteReferrer',
    'network.http.spdy.enabled.http2draft',
    'network.http.spdy.enabled.v3-1',
    'network.websocket.enabled',
    'pageThumbs.enabled',
    'pfs.datasource.url',
    'plugin.scan.Acrobat',
    'plugin.scan.Quicktime',
    'plugin.scan.WindowsMediaPlayer',
    'plugins.enumerable_names',
    'plugins.update.notifyUser',
    'plugins.update.url',
    'privacy.clearOnShutdown.passwords',
    'privacy.donottrackheader.value',
    'security.mixed_content.send_hsts_priming',
    'security.mixed_content.use_hsts',
    'security.ssl3.ecdhe_ecdsa_rc4_128_sha',
    'security.ssl3.ecdhe_rsa_rc4_128_sha',
    'security.ssl3.rsa_rc4_128_md5',
    'security.ssl3.rsa_rc4_128_sha',
    'security.tls.insecure_fallback_hosts.use_static_list',
    'security.tls.unrestricted_rc4_fallback',
    'security.xpconnect.plugin.unrestricted',
    'social.directories',
    'social.enabled',
    'social.remote-install.enabled',
    'social.share.activationPanelEnabled',
    'social.shareDirectory',
    'social.toast-notifications.enabled',
    'social.whitelist',
    'toolkit.telemetry.unifiedIsOptIn',

    /* REMOVED */
    /* 103+ */
    'browser.newtab.preload',
    'browser.newtabpage.activity-stream.feeds.discoverystreamfeed',
    'browser.newtabpage.activity-stream.feeds.snippets',
    'browser.ssl_override_behavior',
    'browser.tabs.warnOnClose',
    'devtools.chrome.enabled',
    'dom.disable_beforeunload',
    'dom.netinfo.enabled',
    'dom.vr.enabled',
    'extensions.formautofill.addresses.supported',
    'extensions.formautofill.available',
    'extensions.formautofill.creditCards.available',
    'extensions.formautofill.creditCards.supported',
    'network.http.altsvc.oe',
    /* 92-102 */
    'browser.urlbar.trimURLs',
    'dom.caches.enabled',
    'dom.storageManager.enabled',
    'dom.storage_access.enabled',
    'dom.targetBlankNoOpener.enabled',
    'network.cookie.thirdparty.sessionOnly',
    'network.cookie.thirdparty.nonsecureSessionOnly',
    'privacy.firstparty.isolate.block_post_message',
    'privacy.firstparty.isolate.restrict_opener_access',
    'privacy.firstparty.isolate.use_site',
    'privacy.window.name.update.enabled',
    'security.insecure_connection_text.enabled',
    /* 79-91 */
    'alerts.showFavicons',
    'browser.newtabpage.activity-stream.asrouter.providers.snippets',
    'browser.send_pings.require_same_host',
    'browser.urlbar.usepreloadedtopurls.enabled',
    'dom.allow_cut_copy',
    'dom.battery.enabled',
    'dom.IntersectionObserver.enabled',
    'dom.storage.enabled',
    'dom.vibrator.enabled',
    'extensions.screenshots.upload-disabled',
    'general.warnOnAboutConfig',
    'gfx.direct2d.disabled',
    'layers.acceleration.disabled',
    'media.getusermedia.audiocapture.enabled',
    'media.getusermedia.browser.enabled',
    'media.getusermedia.screensharing.enabled',
    'media.gmp-widevinecdm.visible',
    'media.media-capabilities.enabled',
    'network.http.redirection-limit',
    'privacy.partition.network_state',
    'security.insecure_connection_icon.enabled',
    'security.mixed_content.block_active_content',
    'security.ssl.enable_ocsp_stapling',
    'security.ssl3.dhe_rsa_aes_128_sha',
    'security.ssl3.dhe_rsa_aes_256_sha',
    'webgl.min_capability_mode',
    /* 69-78 */
    'browser.cache.disk_cache_ssl',
    'browser.search.geoip.url',
    'browser.search.region',
    'browser.sessionhistory.max_entries',
    'dom.push.connection.enabled',
    'dom.push.serverURL',
    'extensions.getAddons.discovery.api_url',
    'extensions.htmlaboutaddons.discover.enabled',
    'extensions.webservice.discoverURL',
    'intl.locale.requested',
    'intl.regional_prefs.use_os_locales',
    'media.block-autoplay-until-in-foreground',
    'middlemouse.paste',
    'plugin.sessionPermissionNow.intervalInMinutes',
    'privacy.usercontext.about_newtab_segregation.enabled',
    'security.insecure_connection_icon.pbmode.enabled',
    'security.insecure_connection_text.pbmode.enabled',
    'webgl.dxgl.enabled',
    /* 61-68 */
    'app.update.service.enabled',
    'app.update.silent',
    'app.update.staging.enabled',
    'browser.cache.disk.capacity',
    'browser.cache.disk.smart_size.enabled',
    'browser.cache.disk.smart_size.first_run',
    'browser.cache.offline.insecure.enable',
    'browser.contentblocking.enabled',
    'browser.laterrun.enabled',
    'browser.offline-apps.notify',
    'browser.rights.3.shown',
    'browser.safebrowsing.blockedURIs.enabled',
    'browser.safebrowsing.downloads.remote.block_dangerous',
    'browser.safebrowsing.downloads.remote.block_dangerous_host',
    'browser.safebrowsing.provider.google.gethashURL',
    'browser.safebrowsing.provider.google.reportMalwareMistakeURL',
    'browser.safebrowsing.provider.google.reportPhishMistakeURL',
    'browser.safebrowsing.provider.google.reportURL',
    'browser.safebrowsing.provider.google.updateURL',
    'browser.safebrowsing.provider.google4.dataSharing.enabled',
    'browser.safebrowsing.provider.google4.dataSharingURL',
    'browser.safebrowsing.provider.google4.gethashURL',
    'browser.safebrowsing.provider.google4.reportMalwareMistakeURL',
    'browser.safebrowsing.provider.google4.reportPhishMistakeURL',
    'browser.safebrowsing.provider.google4.reportURL',
    'browser.safebrowsing.provider.google4.updateURL',
    'browser.safebrowsing.provider.mozilla.gethashURL',
    'browser.safebrowsing.provider.mozilla.updateURL',
    'browser.safebrowsing.reportPhishURL',
    'browser.sessionhistory.max_total_viewers',
    'browser.sessionstore.max_windows_undo',
    'browser.slowStartup.maxSamples',
    'browser.slowStartup.notificationDisabled',
    'browser.slowStartup.samples',
    'browser.storageManager.enabled',
    'browser.urlbar.autoFill.typed',
    'browser.urlbar.filter.javascript',
    'browser.urlbar.maxHistoricalSearchSuggestions',
    'browser.urlbar.userMadeSearchSuggestionsChoice',
    'canvas.capturestream.enabled',
    'dom.allow_scripts_to_close_windows',
    'dom.disable_window_flip',
    'dom.forms.datetime',
    'dom.imagecapture.enabled',
    'dom.popup_maximum',
    'extensions.webextensions.keepStorageOnUninstall',
    'extensions.webextensions.keepUuidOnUninstall',
    'font.blacklist.underline_offset',
    'font.name.monospace.x-unicode',
    'font.name.monospace.x-western',
    'font.name.sans-serif.x-unicode',
    'font.name.sans-serif.x-western',
    'font.name.serif.x-unicode',
    'font.name.serif.x-western',
    'gfx.offscreencanvas.enabled',
    'javascript.options.shared_memory',
    'layout.css.font-loading-api.enabled',
    'media.gmp-gmpopenh264.autoupdate',
    'media.gmp-gmpopenh264.enabled',
    'media.gmp-manager.updateEnabled',
    'media.gmp-manager.url',
    'media.gmp-manager.url.override',
    'media.gmp-widevinecdm.autoupdate',
    'media.gmp.trial-create.enabled',
    'media.navigator.video.enabled',
    'media.peerconnection.ice.tcp',
    'media.peerconnection.identity.enabled',
    'media.peerconnection.identity.timeout',
    'media.peerconnection.turn.disable',
    'media.peerconnection.use_document_iceservers',
    'media.peerconnection.video.enabled',
    'network.auth.subresource-img-cross-origin-http-auth-allow',
    'network.cookie.leave-secure-alone',
    'network.cookie.same-site.enabled',
    'network.dnsCacheEntries',
    'network.dnsCacheExpiration',
    'network.http.fast-fallback-to-IPv4',
    'network.proxy.autoconfig_url.include_path',
    'offline-apps.quota.warn',
    'pdfjs.enableWebGL',
    'plugin.default.state',
    'plugin.defaultXpi.state',
    'plugin.scan.plid.all',
    'privacy.trackingprotection.annotate_channels',
    'privacy.trackingprotection.lower_network_priority',
    'privacy.trackingprotection.pbmode.enabled',
    'privacy.trackingprotection.ui.enabled',
    'security.data_uri.block_toplevel_data_uri_navigations',
    'security.insecure_field_warning.contextual.enabled',
    'security.insecure_password.ui.enabled',
    'security.tls.version.fallback-limit',
    'services.blocklist.addons.collection',
    'services.blocklist.gfx.collection',
    'services.blocklist.onecrl.collection',
    'services.blocklist.plugins.collection',
    'services.blocklist.signing.enforced',
    'services.blocklist.update_enabled',
    'signon.autofillForms.http',
    'signon.storeWhenAutocompleteOff',
    'toolkit.telemetry.cachedClientID',
    'urlclassifier.trackingTable',
    'xpinstall.whitelist.required',
    /* 60 or lower */
    'browser.migrate.automigrate.enabled',
    'browser.search.geoip.timeout',
    'browser.search.reset.enabled',
    'browser.search.reset.whitelist',
    'browser.stopReloadAnimation.enabled',
    'browser.tabs.insertRelatedAfterCurrent',
    'browser.tabs.loadDivertedInBackground',
    'browser.tabs.loadInBackground',
    'browser.tabs.selectOwnerOnClose',
    'browser.urlbar.clickSelectsAll',
    'browser.urlbar.doubleClickSelectsAll',
    'device.storage.enabled',
    'dom.keyboardevent.dispatch_during_composition',
    'dom.presentation.controller.enabled',
    'dom.presentation.discoverable',
    'dom.presentation.discovery.enabled',
    'dom.presentation.enabled',
    'dom.presentation.receiver.enabled',
    'dom.presentation.session_transport.data_channel.enable',
    'dom.vr.oculus.enabled',
    'dom.vr.openvr.enabled',
    'dom.vr.osvr.enabled',
    'extensions.pocket.api',
    'extensions.pocket.oAuthConsumerKey',
    'extensions.pocket.site',
    'general.useragent.compatMode.firefox',
    'geo.wifi.xhr.timeout',
    'gfx.layerscope.enabled',
    'media.flac.enabled',
    'media.mediasource.enabled',
    'media.mediasource.mp4.enabled',
    'media.mediasource.webm.audio.enabled',
    'media.mediasource.webm.enabled',
    'media.mp4.enabled',
    'media.ogg.enabled',
    'media.ogg.flac.enabled',
    'media.opus.enabled',
    'media.raw.enabled',
    'media.wave.enabled',
    'media.webm.enabled',
    'media.webspeech.recognition.enable',
    'media.wmf.amd.vp9.enabled',
    'media.wmf.enabled',
    'media.wmf.vp9.enabled',
    'network.dns.blockDotOnion',
    'network.stricttransportsecurity.preloadlist',
    'security.block_script_with_wrong_mime',
    'security.fileuri.strict_origin_policy',
    'security.sri.enable',
    'services.sync.enabled',
    'ui.submenuDelay',
    'webextensions.storage.sync.enabled',
    'webextensions.storage.sync.serverURL',
    //  excluding these e10 settings
       // 'browser.tabs.remote.autostart',
       // 'browser.tabs.remote.autostart.2',
       // 'browser.tabs.remote.force-enable',
       // 'browser.tabs.remote.separateFileUriProcess',
       // 'extensions.e10sBlocksEnabling',
       // 'extensions.webextensions.remote',
       // 'dom.ipc.processCount',
       // 'dom.ipc.shims.enabledWarnings',
       // 'dom.ipc.processCount.extension',
       // 'dom.ipc.processCount.file',
       // 'security.sandbox.content.level',
       // 'dom.ipc.plugins.sandbox-level.default',
       // 'dom.ipc.plugins.sandbox-level.flash',
       // 'security.sandbox.logging.enabled',

    /* IMPORTANT: last active pref must not have a trailing comma */ 
    /* reset parrot: check your open about:config after running the script */
    '_user.js.parrot'
  ];

  console.clear();

  let c = 0;
  for (const sPname of aPREFS) {
    if (Services.prefs.prefHasUserValue(sPname)) {
      Services.prefs.clearUserPref(sPname);
      if (!Services.prefs.prefHasUserValue(sPname)) {
        console.info('reset', sPname);
        c++;
      } else console.warn('failed to reset', sPname);
    }
  }

  focus();

  const d = (c==1) ? ' pref' : ' prefs';
  alert(c ? 'successfully reset ' + c + d + "\n\nfor details check the console" : 'nothing to reset');

  return 'all done';

})();
