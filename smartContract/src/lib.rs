use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::{env, near_bindgen, AccountId};

#[near_bindgen]
#[derive(BorshSerialize, BorshDeserialize)]
pub struct ArTodo {
    state: UnorderedMap<u64, (String, AccountId, bool)>,
}

#[near_bindgen]
impl ArTodo {
    pub fn add(&mut self, arweave_tx: String) -> bool {
        self.state.insert(
            &self.state.len(),
            &(arweave_tx, env::signer_account_id(), false),
        );
        true
    }

    pub fn done(&mut self, id: String) -> bool {
        let task = self.state.get(&id.parse::<u64>().unwrap()).unwrap();
        if task.1 == env::signer_account_id() {
            let new_task = (task.0, env::signer_account_id(), true);
            self.state.remove(&id.parse::<u64>().unwrap());
            self.state.insert(&id.parse::<u64>().unwrap(), &new_task);
            return true;
        }
        return false;
    }

    pub fn get(&self) -> Vec<(String, AccountId, bool)> {
        let mut temp: Vec<(String, AccountId, bool)> = vec![];
        for g in self.state.values_as_vector().iter() {
            temp.push(g);
        }
        temp
    }
}

impl Default for ArTodo {
    fn default() -> Self {
        Self {
            state: UnorderedMap::<u64, (String, AccountId, bool)>::new(b'a'),
        }
    }
}

//test
//Test
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, VMContext};
    fn get_context(predecessor_account_id: String, storage_usage: u64) -> VMContext {
        VMContext {
            current_account_id: "marketplace.near".to_string(),
            signer_account_id: "anish.testnet".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id,
            input: vec![],
            block_index: 0,
            block_timestamp: 0,
            account_balance: 200,
            account_locked_balance: 0,
            storage_usage,
            attached_deposit: 10,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view: false,
            output_data_receivers: vec![],
            epoch_height: 19,
        }
    }

    #[test]
    fn new_get() {
        let context = get_context("anish.testnet".to_string(), 0);
        testing_env!(context);
        let mut contract = ArTodo::default();
        contract.add("jdsf98erjfierf89erhfifehjfuifeh".to_string());
        contract.add("aksdjf834jjdfjdsf8jasdkofj984kf".to_string());
        assert_eq!(
            contract.get(),
            [
                (
                    "jdsf98erjfierf89erhfifehjfuifeh".to_string(),
                    "anish.testnet".to_string(),
                    false,
                ),
                (
                    "aksdjf834jjdfjdsf8jasdkofj984kf".to_string(),
                    "anish.testnet".to_string(),
                    false,
                )
            ]
        )
    }

    #[test]
    fn done() {
        let context = get_context("anish.testnet".to_string(), 0);
        testing_env!(context);
        let mut contract = ArTodo::default();
        contract.add("sdafjasdjfj".to_string());
        assert_eq!(
            contract.get(),
            [(
                "sdafjasdjfj".to_string(),
                "anish.testnet".to_string(),
                false,
            )]
        );
        contract.done("0".to_string());
        assert_eq!(
            contract.get(),
            [("sdafjasdjfj".to_string(), "anish.testnet".to_string(), true,)]
        );
    }
}
