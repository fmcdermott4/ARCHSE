import {gql} from "@apollo/client";

const QUERY_CATEGORIES = gql`
{
    categories{
        _id
        category
        questions{
            section
            question
            answers
            correctAnswer
            }
        }
    }
`;
const QUERY_CATEGORY_BY_ID = gql`
query catid($id: ID!){
    categoryById(_id : $id){
        _id
        category
        questions{
        section
        question
        answers
        }
    }
}`;

const QUERY_USERS = gql`
{
    users{
        _id
        username
        email
        password
        audits
    }
}`;

export {QUERY_CATEGORIES, QUERY_CATEGORY_BY_ID, QUERY_USERS};