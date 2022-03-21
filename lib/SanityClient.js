import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: 'fwrxasw4',
    dataset: 'production',
    apiVersion: '2021-03-25',
    token:'skiKdOtwBZ9a9vRHWs8onssrKQCbkrwSpS9Nhq6SE98nQ5nLDj1KEJ6utGgAHCHmzMGcze00RNYqHVB1GysaeLLG4zIGQUKB69eCPi9G8fPoL1VgfVlBlhwYdhdYERkjiPajFMVUjsrQoraq8vCv863jFRFIJPmqhTgGWGzvUqn3g6HJbbE5',
    useCdn: false
})