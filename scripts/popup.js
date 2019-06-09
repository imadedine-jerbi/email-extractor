/**
 *
 * @author Imadedine Jerbi
 * @since  1.0
 */

document
    .addEventListener('DOMContentLoaded', function () {

        document
            .getElementById('refrech-result')
            .addEventListener('click', refrech, false)
        document
            .getElementById('copy')
            .addEventListener('click', copy, false)
        document
            .getElementById('to-email')
            .addEventListener('click', toEmail, false)
        document
            .getElementById('download-csv')
            .addEventListener('click', downloadCsv, false)
        document
            .getElementById('download-txt')
            .addEventListener('click', downloadTxt, false)

        refrech(false)
    }, false);