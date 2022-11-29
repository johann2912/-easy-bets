const errorMessager = {
    user: {
        notFoundUsers: 'Not found search users.',
        notFoundUser: 'Not found user',
        userExist: 'Already user exists.',
        userNotAdmin: 'The user is not allowed to perform this action.',
        userNotClient: 'The user is not allowed to perform this action.',
        userNotCredentials: 'Error with credentials',
        userInsufficientCredits: 'The user does not have the required amount of credits.',
        userBetNotFound: 'The search bet does not found.'
    },
    roullete: {
        notFoundRoulettes: 'Not found search roulttes',
        notFoundRoulette: 'Not found roulette',
        rouletteExist: 'Already roulette exist',
        RouletteMinimumNumber: 'Minimum number exceeded',
        RouletteMaximumNumber: 'Maximum number exceeded'
    },
};

module.exports = errorMessager;