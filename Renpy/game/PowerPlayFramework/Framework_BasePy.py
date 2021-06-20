# TODO: Enable when python3 becomes supported by Ren'Py
# TODO: Enable when python3 becomes supported by Ren'Py
#from abc import ABC, abstractmethod

# TODO: Enable when python3 becomes supported by Ren'Py
#class Buildable_From_Json(ABC):
class Buildable_From_Json(object):
    def _get_methods(self):
        attributes = dir(self)
        result = []
        for method_name in attributes:
            # Try catch to handle exceptions when encountering "pandas style python3.6 abstract virtual sub-classes." (ref: https://stackoverflow.com/questions/34439/finding-what-methods-a-python-object-has)
            try:
                if callable(getattr(self, method_name)):
                    result.append(str(method_name))
            except:
                result.append(str(method_name))
        return result

    # TODO: Enable when python3 becomes supported by Ren'Py
    # @abstractmethod
    def reset(self):
        pass

    def build_from_json(self, json):
        self.reset()
        self_methods = self._get_methods()
        for key in json.keys():
            setter_name = "set_" + key
            if setter_name in self_methods:
                self.__getattribute__(setter_name)(json[key])
