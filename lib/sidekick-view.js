'use babel';

import Elm from '../elm/sidekick';

export default class SidekickView {

  constructor(indexer, config) {
    this.elmDiv = document.createElement('div');
    // Set `tabindex` to `-1` to allow selecting.
    this.elmDiv.setAttribute('tabindex', -1);
    // Add `native-key-bindings` to class list to allow copying.
    this.elmDiv.classList.add('elmjutsu-sidekick', 'native-key-bindings');
    this.sidekick = Elm.Sidekick.embed(this.elmDiv, config);
    indexer.ports.activeHintsChangedCmd.subscribe((activeHints) => {
      this.sidekick.ports.activeHintsChangedSub.send(activeHints);
    });
    indexer.ports.activeFileChangedCmd.subscribe((activeFile) => {
      this.sidekick.ports.activeFileChangedSub.send(activeFile);
    });
    indexer.ports.docsReadCmd.subscribe((data) => {
      this.sidekick.ports.docsReadSub.send(null);
    });
    indexer.ports.docsDownloadedCmd.subscribe((data) => {
      this.sidekick.ports.docsDownloadedSub.send(null);
    });
    indexer.ports.downloadDocsFailedCmd.subscribe((data) => {
      this.sidekick.ports.downloadDocsFailedSub.send(data);
    });
    indexer.ports.readingPackageDocsCmd.subscribe((data) => {
      this.sidekick.ports.readingPackageDocsSub.send(null);
    });
    indexer.ports.downloadingPackageDocsCmd.subscribe((data) => {
      this.sidekick.ports.downloadingPackageDocsSub.send(null);
    });
    this.sidekick.ports.goToDefinitionCmd.subscribe((name) => {
      indexer.ports.goToDefinitionSub.send(name);
    });
  }

  destroy() {
    this.elmDiv.remove();
    this.elmDiv = null;
  }

  getElement() {
    return this.elmDiv;
  }

  updateConfig(config) {
    this.sidekick.ports.configChangedSub.send(config);
  }

}
