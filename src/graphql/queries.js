/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMeruApiSub = /* GraphQL */ `
  query GetMeruApiSub($owner_id: String!) {
    getMeruApiSub(owner_id: $owner_id) {
      owner_id
      dropbox
      indicies
      indices
      meru
      queries
      subscription_plan
    }
  }
`;
export const listMeruApiSubs = /* GraphQL */ `
  query ListMeruApiSubs(
    $owner_id: String
    $filter: ModelMeruApiSubFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMeruApiSubs(
      owner_id: $owner_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        owner_id
        dropbox
        indicies
        indices
        meru
        queries
        subscription_plan
      }
      nextToken
    }
  }
`;
