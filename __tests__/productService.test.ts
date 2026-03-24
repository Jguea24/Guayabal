jest.mock("../src/services/api", () => ({
  api: {
    get: jest.fn(),
  },
}));

import { api } from "../src/services/api";
import {
  buildProductQueryParams,
  getProductByIdService,
  getProductsService,
} from "../src/services/productService";

describe("productService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("omite filtros vacios o equivalentes a todos", () => {
    expect(buildProductQueryParams()).toEqual({});
    expect(buildProductQueryParams(0)).toEqual({});
    expect(buildProductQueryParams("Todos")).toEqual({});
    expect(buildProductQueryParams("all")).toEqual({});
    expect(buildProductQueryParams("0")).toEqual({});
  });

  it("transforma categoria numerica y textual al formato esperado", () => {
    expect(buildProductQueryParams(7)).toEqual({ category_id: 7 });
    expect(buildProductQueryParams("whisky")).toEqual({
      category: "whisky",
    });
  });

  it("envia los parametros transformados al cliente API", async () => {
    const mockedApi = api as jest.Mocked<typeof api>;
    mockedApi.get.mockResolvedValueOnce({ data: [{ id: 1 }] });

    const result = await getProductsService("ron");

    expect(mockedApi.get).toHaveBeenCalledWith("products/", {
      params: { category: "ron" },
    });
    expect(result).toEqual([{ id: 1 }]);
  });

  it("consulta un producto puntual por id", async () => {
    const mockedApi = api as jest.Mocked<typeof api>;
    mockedApi.get.mockResolvedValueOnce({ data: { id: 9, name: "Vodka" } });

    const result = await getProductByIdService(9);

    expect(mockedApi.get).toHaveBeenCalledWith("products/9/");
    expect(result).toEqual({ id: 9, name: "Vodka" });
  });
});
