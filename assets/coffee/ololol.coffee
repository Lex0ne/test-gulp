MAX_TEXT_LENGTH = 200

class ReturnPolicy
    constructor: ({@notRefundable, @returnTerms, @paymentShipping,
        @paymentShippingOptions, @returnPolicyText, @isReturnPolicyDisabled})->
        @overlayVisible = false
        @formErrorMessages = {}
        @successMessage = null
        @errorMessage = null

    setNotRefundable: (@notRefundable) ->

    setPaymentShipping: (@paymentShipping) ->

    setReturnTerms: (@returnTerms) ->

    setReturnPolicyText: (@returnPolicyText) ->

    setOverlayVisible: (@overlayVisible) ->

    setSuccessMessage: (@successMessage) ->

    setFormErrorMessages: (@formErrorMessages) ->

    setErrorMessage: (@errorMessage) ->

    getViewState: ->
        {
            @notRefundable
            @returnTerms
            @paymentShipping
            @paymentShippingOptions
            @returnPolicyText
            @overlayVisible
            @isReturnPolicyDisabled
            @successMessage
            @formErrorMessages
            @errorMessage
            leftSymbols: MAX_TEXT_LENGTH - @returnPolicyText.length
        }

module.exports = ReturnPolicy

