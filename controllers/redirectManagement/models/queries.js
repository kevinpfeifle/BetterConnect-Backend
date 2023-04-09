'use strict'

// Retreives the needed redirection details, takes cardId as parameter.
let getRedirectionForCardId = `SELECT
    R.redirect_id,
    R.protocol_type,
    H.redirect_host,
    R.port,
    R.path,
    R.query_string
FROM
    redirect.redirect AS R
    INNER JOIN card.card AS C ON R.redirect_id = C.redirect_id
    INNER JOIN redirect.host as H on R.host_id = H.host_id
WHERE
    C.card_id = ?
    AND R.active_ind = true
    AND C.active_ind = true
    AND H.active_ind = true
    AND H.blocked = false;`;

module.exports = {
    getRedirectionForCardId: getRedirectionForCardId
}