## Package `@cable_ready/invoke_operations`

A collection of invoke operations meant to be used with [`cable_ready`](https://github.com/cableready/cable_ready).


### Installation

Install `@cable_ready/invoke_operations` in your application:

```bash
yarn add @cable_ready/invoke_operations

# or

npm install --save @cable_ready/invoke_operations
```

### Usage

Add the invoke operations to CableReady:

```javascript
// app/javascript/packs/application.js

import CableReady from 'cable_ready'
import InvokeOperations from '@cable_ready/invoke_operations'

CableReady.addOperations(InvokeOperations)
```

And configure CableReady on the Ruby side to include the new operation:

```ruby
# config/initializers/cable_ready.rb

CableReady.configure do |config|
  config.add_operation_name :invoke_method
end
```
