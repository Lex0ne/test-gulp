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
        }

module.exports = ReturnPolicy

