function Pager () {
    let page = 0

    let minBound = -Infinity
    let maxBound = Infinity

    let attachments = { }

    function setPage (newPage) {
        page = newPage

        const pageAttachments = attachments[page]
        const eachListener = attachments['each']

        callAll(pageAttachments)
        callAll(eachListener)

        function callAll (pageAttachments) {
            if (Array.isArray(pageAttachments)) {
                pageAttachments.forEach(attachment => attachment(page))
            }
        }
    }

    return {
        attachments,
        goTo (newPage) {
            page = newPage
        },
        each (listener) {
            this.attachTo('each', listener)
        },
        attach (attacher) {
            for (const [page, listener] of Object.entries(attacher)) {
                this.attachTo(page, listener)
            }
        },
        attachTo (page, listener) {
            if (!attachments[page]) {
                attachments[page] = []
            }
            attachments[page].push(listener)
        },
        next () {
            const nextPage = page + 1
            if (nextPage <= maxBound) {
                setPage(nextPage)
            }
        },
        previous () {
            const previousPage = page - 1
            if (previousPage >= minBound) {
                setPage(previousPage)
            }
        },
        getPage () {
            return page
        },
        setBounds (min = 0, max = 100) {
            if (page < min) {
                page = min
            } else if (page > max) {
                page = max
            }
            minBound = min
            maxBound = max
        }
    }
}

export default Pager

