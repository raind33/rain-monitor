import { injectJsError } from './lib/jsError'
import injectXhrError from './lib/xhr'
import timing from './lib/timing'
injectJsError()
injectXhrError()
timing()