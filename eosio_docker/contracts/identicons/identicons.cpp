#include <eosiolib/eosio.hpp>

class identicons : public eosio::contract
{
    public:
      identicons(account_name s) : contract(s),   // initialization of the base class for the contract
                                           _records(s, s) // initialize the table with code and scope NB! Look up definition of code and scope
      {
      }

      /// @abi action
      void create(account_name owner, const std::string &identiconCode)
      {

            require_auth(owner);

            // _records.end() is in a way similar to null and it means that the value isn't found
            // uniqueness of primary key is enforced at the library level but we can enforce it in the contract with a
            // better error message
            eosio_assert(_records.find(owner) == _records.end(), "This record already exists in the Identicons registry");

            // we use phone as a secondary key
            // secondary key is not necessarily unique, we will enforce its uniqueness in this contract
            // eosio_assert(idx.find(identiconCode) == idx.end(), "Identicon Code is already taken");

            _records.emplace(owner, [&](auto &rcrd) {
                  rcrd.owner = owner;
                  rcrd.identiconCode = identiconCode;
            });
      }

      /// @abi action
      void remove(account_name owner)
      {

            require_auth(owner);

            auto itr = _records.find(owner);
            eosio_assert(itr != _records.end(), "Identicon does not exit");
            _records.erase(itr);
      }

      /// @abi action
      void update(account_name owner, const std::string &identiconCode)
      {

            require_auth(owner);

            auto itr = _records.find(owner);
            eosio_assert(itr != _records.end(), "Identicon does not exit");
            _records.modify(itr, owner, [&](auto &rcrd) {
                  rcrd.identiconCode = identiconCode;
            });
      }

    private:
      // Setup the struct that represents a row in the table   
      /// @abi table records   
      struct record
      {
            account_name owner; // primary key
            std::string identiconCode;

            uint64_t primary_key() const { return owner; }
      };

      typedef eosio::multi_index<N(records), record> IdenticonsTable;

      // Creating the instance of the `record_table` type
      IdenticonsTable _records;
};

EOSIO_ABI( identicons, (create)(remove)(update) )