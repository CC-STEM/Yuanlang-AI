<script setup lang="ts">
import { ref, onMounted } from "vue";
// import axios from "axios";

interface Region {
  code: string;
  name: string;
  children?: Region[];
}

const provinces = ref<Region[]>([]);
const cities = ref<Region[]>([]);
const districts = ref<Region[]>([]);

const selectedProvince = ref("");
const selectedCity = ref("");
const selectedDistrict = ref("");

const form = ref({
  name: "",
  phone: "",
  address: "",
});

// 加载省份数据
const loadProvinces = async () => {
  try {
    // const response = await axios.get('https://api.example.com/regions/provinces')
    provinces.value = [];
  } catch (error) {
    console.error("加载省份数据失败:", error);
    // 模拟数据
    provinces.value = [
      { code: "110000", name: "北京市" },
      { code: "320000", name: "江苏省" },
      { code: "330000", name: "浙江省" },
    ];
  }
};

// 加载城市数据
const loadCities = async (provinceCode: string) => {
  if (!provinceCode) {
    cities.value = [];
    districts.value = [];
    return;
  }

  try {
    // const response = await axios.get(\`https://api.example.com/regions/cities/\${provinceCode}\`)
    cities.value = [];
  } catch (error) {
    console.error("加载城市数据失败:", error);
    // 模拟数据
    cities.value = [
      { code: "110100", name: "北京市" },
      { code: "320100", name: "南京市" },
      { code: "320200", name: "无锡市" },
    ];
  }
  selectedCity.value = "";
  districts.value = [];
};

// 加载区县数据
const loadDistricts = async (cityCode: string) => {
  if (!cityCode) {
    districts.value = [];
    return;
  }

  try {
    // const response = await axios.get(\`https://api.example.com/regions/districts/\${cityCode}\`)
    districts.value = [];
  } catch (error) {
    console.error("加载区县数据失败:", error);
    // 模拟数据
    districts.value = [
      { code: "110101", name: "东城区" },
      { code: "110102", name: "西城区" },
      { code: "110105", name: "朝阳区" },
    ];
  }
  selectedDistrict.value = "";
};

// 监听省份选择
const handleProvinceChange = (value: string) => {
  selectedProvince.value = value;
  loadCities(value);
};

// 监听城市选择
const handleCityChange = (value: string) => {
  selectedCity.value = value;
  loadDistricts(value);
};

// 提交表单
const handleSubmit = () => {
  console.log("表单数据:", {
    ...form.value,
    province: selectedProvince.value,
    city: selectedCity.value,
    district: selectedDistrict.value,
  });
};

onMounted(() => {
  loadProvinces();
});
</script>

<template>
  <div class="form-page">
    <div class="form-container">
      <h1 class="page-title">收货地址</h1>

      <el-form
        ref="formRef"
        :model="form"
        label-position="top"
        class="address-form"
      >
        <!-- 联系人信息 -->
        <el-form-item label="收货人姓名">
          <el-input v-model="form.name" placeholder="请输入收货人姓名" />
        </el-form-item>

        <el-form-item label="联系电话">
          <el-input v-model="form.phone" placeholder="请输入联系电话" />
        </el-form-item>

        <!-- 省市区选择 -->
        <div class="region-selects">
          <el-form-item label="所在地区">
            <div class="select-group">
              <el-select
                v-model="selectedProvince"
                placeholder="请选择省份"
                @change="handleProvinceChange"
              >
                <el-option
                  v-for="province in provinces"
                  :key="province.code"
                  :label="province.name"
                  :value="province.code"
                />
              </el-select>

              <el-select
                v-model="selectedCity"
                placeholder="请选择城市"
                :disabled="!selectedProvince"
                @change="handleCityChange"
              >
                <el-option
                  v-for="city in cities"
                  :key="city.code"
                  :label="city.name"
                  :value="city.code"
                />
              </el-select>

              <el-select
                v-model="selectedDistrict"
                placeholder="请选择区县"
                :disabled="!selectedCity"
              >
                <el-option
                  v-for="district in districts"
                  :key="district.code"
                  :label="district.name"
                  :value="district.code"
                />
              </el-select>
            </div>
          </el-form-item>
        </div>

        <!-- 详细地址 -->
        <el-form-item label="详细地址">
          <el-input
            v-model="form.address"
            type="textarea"
            rows="3"
            placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等"
          />
        </el-form-item>

        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" class="submit-btn" @click="handleSubmit">
            保存地址
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.form-page {
  min-height: 100vh;
  padding: 40px 20px;
  background: #0a0f25;
}

.form-container {
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 32px;
}

.page-title {
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 32px;
  text-align: center;
}

.address-form {
  :deep(.el-form-item__label) {
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    margin-bottom: 8px;
  }

  :deep(.el-input__inner) {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:hover,
    &:focus {
      border-color: #409eff;
    }
  }

  :deep(.el-textarea__inner) {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:hover,
    &:focus {
      border-color: #409eff;
    }
  }
}

.select-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

:deep(.el-select) {
  width: 100%;

  .el-input__inner {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
  }

  .el-select__caret {
    color: rgba(255, 255, 255, 0.7);
  }
}

.submit-btn {
  width: 100%;
  height: 40px;
  background: #ff4d4f;
  border: none;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    background: #f03f41;
  }
}

@media (max-width: 768px) {
  .form-container {
    padding: 20px;
  }

  .select-group {
    grid-template-columns: 1fr;
  }
}
</style>
