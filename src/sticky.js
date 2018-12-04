const sticky = {
    // Elements //
    target : document.getElementById('the-target'),
    targetImg : document.getElementById('image-target'),
    targetContainer : document.getElementById('container-target'),
    rowTarget : document.getElementById('row-target'),
    adsTarget : document.getElementById('row-target'),

    init : function() {
        window.addEventListener('scroll', () => {
            // Top  Constraint//
            const nav = document.querySelector('nav');
            let navHeight = this._getRectValue(nav, 'height'),
            targetTop = (this._getRectValue(this.target, 'top') - navHeight);

            if (targetTop <= 0) {
                this.targetImg.classList.add('fixed');
                this.targetImg.style.top = `${navHeight}px`;
            }
            else {
                this.targetImg.style = '';
                this.targetImg.classList.remove('fixed');
            }

            // Bottom  Constraint //
            let screenHeight = this._getScreenHeight(),
            rowBtm = this._getRectValue(this.rowTarget, 'bottom'),
            targetHeight = this._getRectValue(this.targetImg, 'height'),
            rowHeight = this._getRectValue(this.rowTarget, 'height'),
            scrollY = Math.round(window.scrollY),
            spaceRemaining = ((rowHeight - scrollY) - navHeight),
            adsStyle = this._getComputedStyle(this.adsTarget),
            bottomValue = (screenHeight - rowBtm) + parseInt(adsStyle.marginBottom);

            if(spaceRemaining <= targetHeight) {
                this.targetImg.style = '';
                this.targetImg.style.bottom = `${bottomValue}px`;
            }

        });
    },

    // Internal Methods //
    _getRectValue(el, pos) {
        return Math.round(el.getBoundingClientRect()[pos]);
    },

    _getComputedStyle(el) {
        return el.currentStyle || window.getComputedStyle(el);
    },

    _getScreenHeight() {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    }


};

module.exports = sticky;