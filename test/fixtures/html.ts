export const htmlFixture = `
<div class="zodiac">
  <div class="zodiac-inner">
    <div class="zodiac-track">
      <div class="zodiac-item"><a data-zodiac-live-region-title="1. Text" href="#">1. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="2. Text" href="#">2. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="3. Text" href="#">3. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="4. Text" href="#">4. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="5. Text" href="#">5. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="6. Text" href="#">6. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="7. Text" href="#">7. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="8. Text" href="#">8. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="9. Text" href="#">9. Text</a></div>
    </div>
  </div>
  <button data-zodiac-direction="left">Prev</button>
  <button data-zodiac-direction="right">Next</button>
</div>
`;

export const htmlFixtureMultipleSliders = `
<div id="zodiac-1" class="zodiac">
  <div class="zodiac-inner">
    <div class="zodiac-track zodiac-track-1">
      <div class="zodiac-item"><a data-zodiac-live-region-title="1. Text" href="#">1. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="2. Text" href="#">2. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="3. Text" href="#">3. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="4. Text" href="#">4. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="5. Text" href="#">5. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="6. Text" href="#">6. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="7. Text" href="#">7. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="8. Text" href="#">8. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="9. Text" href="#">9. Text</a></div>
    </div>
  </div>
  <button data-zodiac-direction="left">Prev</button>
  <button data-zodiac-direction="right">Next</button>
</div>
<div id="zodiac-2" class="zodiac">
  <div class="zodiac-inner">
    <div class="zodiac-track zodiac-track-2">
      <div class="zodiac-item"><a data-zodiac-live-region-title="1. Text" href="#">1. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="2. Text" href="#">2. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="3. Text" href="#">3. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="4. Text" href="#">4. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="5. Text" href="#">5. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="6. Text" href="#">6. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="7. Text" href="#">7. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="8. Text" href="#">8. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="9. Text" href="#">9. Text</a></div>
    </div>
  </div>
  <button data-zodiac-direction="left">Prev</button>
  <button data-zodiac-direction="right">Next</button>
</div>
`;

export const htmlFixtureNoControls = `
<div class="zodiac">
  <div class="zodiac-inner">
    <div class="zodiac-track">
      <div class="zodiac-item"><a data-zodiac-live-region-title="1. Text" href="#">1. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="2. Text" href="#">2. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="3. Text" href="#">3. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="4. Text" href="#">4. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="5. Text" href="#">5. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="6. Text" href="#">6. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="7. Text" href="#">7. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="8. Text" href="#">8. Text</a></div>
      <div class="zodiac-item"><a data-zodiac-live-region-title="9. Text" href="#">9. Text</a></div>
    </div>
  </div>
</div>
`;

export const htmlFixtureFocusableSelectors = `
<div class="zodiac">
  <div class="zodiac-inner">
    <div class="zodiac-track">
      <div class="zodiac-item"><a href="#">1. Text</a></div>
      <div class="zodiac-item"><map><area href="#">2. Text</area></map></div>
      <div class="zodiac-item"><input type="text" value="3. Text"></div>
      <div class="zodiac-item"><select><option value="4">4. Text</option></select></div>
      <div class="zodiac-item"><textarea>5. Text</textarea></div>
      <div class="zodiac-item"><button type="button">6. Text</button></div>
      <div class="zodiac-item"><iframe src="#">7. Text</iframe></div>
      <div class="zodiac-item"><object src="#">8. Text</object></div>
      <div class="zodiac-item"><embed src="#">9. Text</embed></div>
      <div class="zodiac-item"><span tabindex="0">10. Text</span></div>
      <div class="zodiac-item"><span contenteditable="true">11. Text</span></div>
    </div>
  </div>
  <button data-zodiac-direction="left">Prev</button>
  <button data-zodiac-direction="right">Next</button>
</div>
`;

export const itemTotal = 9;
