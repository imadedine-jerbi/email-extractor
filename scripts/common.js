const refrech = (onlyBadge = false) => {

    chrome
        .tabs
        .query({
            currentWindow: true,
            active: true
        }, function (tabs) {

            chrome
                .tabs
                .sendMessage(tabs[0].id, {
                    tab: tabs[0],
                    data: {
                        onlyBadge: onlyBadge
                    }
                }, showResults);
        });
}
const showResults = res => {

    if (res && res.content) {

        const emailExtractor = new EmailExtractor(res.content);
        updateBadge(emailExtractor.getUniqueEmailsCount());

        if (res.options && res.options.data && res.options.data.onlyBadge === true) {
            return false;
        }

        updateResultInfoView(emailExtractor.getUniqueEmailsCount(), emailExtractor.getUniqueEmailsDomainsCount());
    }
}
const updateResultInfoView = (emailsUniqueCount = 0, domainUniqueCount = 0) => {

    const emailsUniqueCountEl = document.getElementById('emailsUniqueCount');
    const emailsDomainUniqueCountEl = document.getElementById('emailsDomainsUniqueCount');
    emailsUniqueCountEl.textContent = emailsUniqueCount;
    emailsDomainUniqueCountEl.textContent = domainUniqueCount;
}
const updateBadge = text => {

    chrome
        .browserAction
        .setBadgeBackgroundColor({
            color: [17, 125, 208, 1]
        });
    chrome
        .browserAction
        .setBadgeText({
            text: text.toString()
        });
}
const copy = () => {

    chrome
        .tabs
        .query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            chrome
                .tabs
                .sendMessage(tabs[0].id, {
                    tab: tabs[0],
                    data: {}
                }, (res) => {

                    showResults(res)

                    if (res && res.content) {

                        const emailExtractor = new EmailExtractor(res.content);
                        const emails = emailExtractor.getUniqueEmails();
                        copyToClipboard(emails.join(' '));
                    }
                })
        })
}
const toEmail = () => {
    chrome
        .tabs
        .query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            chrome
                .tabs
                .sendMessage(tabs[0].id, {
                    tab: tabs[0],
                    data: {}
                }, (res) => {

                    if (res && res.content) {

                        showResults(res);
                        const emailExtractor = new EmailExtractor(res.content);
                        const emails = emailExtractor.getUniqueEmails();
                        const emailsText = emails.join(';');

                        if (!empty(emailsText)) {

                            var emailUrl = 'mailto:' + escape(emailsText);

                            chrome
                                .tabs
                                .create({
                                    url: emailUrl
                                }, function (tab) {
                                    setTimeout(function () {
                                        chrome
                                            .tabs
                                            .remove(tab.id);
                                    }, 500);
                                });
                        }

                    }
                })
        })
}
const downloadCsv = () => {
    chrome
        .tabs
        .query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            chrome
                .tabs
                .sendMessage(tabs[0].id, {
                    tab: tabs[0],
                    data: {}
                }, (res) => {
                    showResults(res)

                    if (res && res.content) {

                        const emailExtractor = new EmailExtractor(res.content);
                        const emails = emailExtractor.getUniqueEmails();

                        if (emails.length > 0) {

                            Download.csv(emails);
                        }
                    }
                })
        })
}
const downloadTxt = () => {
    chrome
        .tabs
        .query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            chrome
                .tabs
                .sendMessage(tabs[0].id, {
                    tab: tabs[0],
                    data: {}
                }, (res) => {
                    showResults(res)

                    if (res && res.content) {

                        const emailExtractor = new EmailExtractor(res.content);
                        const emails = emailExtractor.getUniqueEmails();

                        if (emails.length > 0) {

                            Download.txt(emails.join(', '));
                        }

                    }
                })
        })
}